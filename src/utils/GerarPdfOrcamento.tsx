import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { useAppContext } from '../context/AppContext';

// Função para converter logo local para base64
async function getLogoBase64(): Promise<string> {
  const asset = Asset.fromModule(require('../assets/logo.png'));
  await asset.downloadAsync();

  const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return `data:image/png;base64,${base64}`;
}

export function useGerarPdfOrcamento() {
  const { produtosOrcamento, totalOrcamento } = useAppContext();

  const gerarECompartilharPdf = async () => {
    // Converte a logo para base64
    const logoBase64 = await getLogoBase64();

    const dataHoraAtual = new Date().toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });

    const nomeCliente = 'DISAUTO DISTRIBUIDORA DE AUTOPEÇAS LTDA';
    const enderecoCliente = 'Rua Exemplo, 123 - Cidade/UF';

    const produtosHTML = produtosOrcamento
      .map(
        (item) => `
          <tr class="linhaTabela">
            <td>${item.codigo}</td>
            <td>${item.descricao}</td>
            <td class="preco">R$ ${item.preco.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
          </tr>
        `
      )
      .join('');

    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }

            body {
              font-family: Arial, sans-serif;
              font-size: 12pt;
              margin: 0;
              color: #333;
              width: 100%;
            }

            .container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }

            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 20px;
            }

            .logo {
              width: 150px;
              height: auto;
            }

            .info-cliente {
              text-align: right;
            }

            .info-cliente h2 {
              margin: 0;
              font-size: 16pt;
            }

            .info-cliente p {
              margin: 2px 0;
              font-size: 11pt;
            }

            .data-hora {
              text-align: right;
              font-size: 10pt;
              margin-bottom: 20px;
              color: #666;
            }

            .tabela {
              width: 100%;
              border-collapse: collapse;
            }

            /* Cabeçalho da tabela */
            .linhaCabecalho {
              background-color: #861a22;
              color: #fff;
            }

            .linhaCabecalho th {
              padding: 8px;
              text-align: center;
              font-weight: bold;
            }

            /* Linhas de produtos */
            .linhaTabela td {
              padding: 8px;
              text-align: center;
              border-bottom: 1px solid #ddd;
            }

            .preco {
              color: green;
              font-weight: bold;
            }

            /* Linha total */
            .linhaTotal {
              background-color: #861a22;
              color: #fff;
              font-weight: bold;
            }

            .linhaTotal td {
              padding: 8px;
              text-align: right;
            }

            .linhaTotal .label {
              text-align: left;
              width: 500px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Cabeçalho -->
            <div class="header">
              <img src="${logoBase64}" class="logo" />
              <div class="info-cliente">
                <h2>${nomeCliente}</h2>
                <p>${enderecoCliente}</p>
              </div>
            </div>

            <!-- Data e hora -->
            <div class="data-hora">Gerado em: ${dataHoraAtual}</div>

            <!-- Tabela -->
            <table class="tabela">
              <tr class="linhaCabecalho">
                <th style="width: 100px;">Código</th>
                <th style="width: 200px;">Descrição</th>
                <th style="width: 100px;">Preço</th>
                <th style="width: 100px;">Qtd</th>
                <th style="width: 120px;">Total</th>
              </tr>
              ${produtosHTML}
              <tr class="linhaTotal">
                <td colspan="4" class="label">TOTAL GERAL</td>
                <td>R$ ${totalOrcamento.toFixed(2)}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;

    // Gera o PDF
    const { uri } = await Print.printToFileAsync({ html });

    // Compartilha o PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartilhar Orçamento',
      });
    } else {
      alert('Compartilhamento não disponível neste dispositivo.');
    }
  };

  return { gerarECompartilharPdf };
}
