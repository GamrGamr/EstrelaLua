import { createLanguageSwitch, getLanguage, saveLanguage } from "../../assets/i18n-core.js";

export let currentLanguage = getLanguage();
export const locale = () => currentLanguage === "pt" ? "pt-PT" : "en-IE";
export const tr = (en, pt) => currentLanguage === "pt" ? pt : en;

const pairs = [
  ["Skip to calculator", "Saltar para a calculadora"], ["EstrelaLuaApps home", "Página inicial da EstrelaLuaApps"], ["Calculator navigation", "Navegação da calculadora"], ["Calculator sections", "Secções da calculadora"], ["About this app", "Sobre esta app"], ["Main website", "Website principal"],
  ["Travel cost calculator · Beta", "Calculadora de custos de viagem · Beta"], ["Plan the cost.", "Planeie o custo."], ["Know the real total.", "Conheça o total real."],
  ["Start with a distance, your vehicle’s consumption, and an energy price. Add tolls and other costs only when you need them.", "Comece pela distância, consumo do veículo e preço da energia. Adicione portagens e outros custos apenas quando precisar."],
  ["Manual & private", "Manual e privada"], ["All calculations and saved data stay in this browser.", "Todos os cálculos e dados guardados ficam neste navegador."],
  ["1. Journey", "1. Viagem"], ["2. Vehicle", "2. Veículo"], ["3. Costs", "3. Custos"], ["4. Results", "4. Resultados"], ["Vehicles", "Veículos"], ["Fill-ups", "Abastecimentos"], ["Saved journeys", "Viagens guardadas"], ["Settings & data", "Definições e dados"],
  ["Journey", "Viagem"], ["Enter the distance and journey type.", "Introduza a distância e o tipo de viagem."], ["Distance and duration", "Distância e duração"], ["One-way distance", "Distância de ida"], ["Enter a value greater than zero.", "Introduza um valor superior a zero."], ["One-way duration", "Duração de ida"], ["Optional", "Opcional"], ["Click the field and enter four digits; for example, 0130 becomes 01h30.", "Clique no campo e introduza quatro dígitos; por exemplo, 0130 passa a 01h30."],
  ["Journey options", "Opções da viagem"], ["One-way", "Só ida"], ["Return", "Ida e volta"], ["Passengers", "Passageiros"], ["Journey name", "Nome da viagem"], ["Notes", "Notas"],
  ["Vehicle & consumption", "Veículo e consumo"], ["Use a saved vehicle or enter values quickly.", "Utilize um veículo guardado ou introduza os valores rapidamente."], ["Saved vehicle", "Veículo guardado"], ["Custom vehicle", "Veículo personalizado"], ["New vehicle", "Novo veículo"], ["Vehicle name", "Nome do veículo"], ["Energy type", "Tipo de energia"], ["Petrol", "Gasolina"], ["Diesel", "Gasóleo"], ["Hybrid", "Híbrido"], ["Plug-in hybrid", "Híbrido plug-in"], ["Electric", "Elétrico"],
  ["Consumption source", "Origem do consumo"], ["Manual consumption", "Consumo manual"], ["Latest measured", "Último valor medido"], ["Latest-three average", "Média dos últimos três"], ["Overall measured average", "Média geral medida"], ["City measured average", "Média medida em cidade"], ["Motorway measured average", "Média medida em autoestrada"], ["Mixed measured average", "Média medida em percurso misto"], ["Fuel consumption", "Consumo de combustível"], ["Electric consumption", "Consumo elétrico"], ["Fuel price", "Preço do combustível"], ["Electricity price", "Preço da eletricidade"], ["Maintenance allowance", "Margem para manutenção"],
  ["Additional costs", "Custos adicionais"], ["Tolls, ferry, parking, and anything else.", "Portagens, ferry, estacionamento e outros custos."], ["Tolls", "Portagens"], ["Enter any road charges for this journey.", "Introduza os encargos rodoviários desta viagem."], ["Outbound toll", "Portagem de ida"], ["Return toll", "Portagem de regresso"], ["Use zero when a direction has no tolls.", "Utilize zero quando um sentido não tiver portagens."], ["Ferry", "Ferry"], ["Parking", "Estacionamento"], ["Custom costs", "Custos personalizados"], ["Add cost", "Adicionar custo"],
  ["Ready to calculate?", "Pronto para calcular?"], ["Your manual data stays on this device.", "Os dados manuais ficam neste dispositivo."], ["Calculate journey", "Calcular viagem"], ["Journey result", "Resultado da viagem"], ["Your estimate", "A sua estimativa"], ["Total journey cost", "Custo total da viagem"], ["Per passenger", "Por passageiro"], ["Total distance", "Distância total"], ["Energy", "Energia"], ["Other costs", "Outros custos"], ["Enter the distance and vehicle values, then calculate.", "Introduza a distância e os dados do veículo e depois calcule."], ["Save journey", "Guardar viagem"], ["Recalculate", "Recalcular"], ["Duplicate", "Duplicar"], ["Copy summary", "Copiar resumo"], ["Export summary", "Exportar resumo"], ["Print", "Imprimir"], ["Reset", "Repor"],
  ["Local garage", "Garagem local"], ["Saved vehicles", "Veículos guardados"], ["Create, edit, duplicate, archive, or remove profiles stored in this browser.", "Crie, edite, duplique, arquive ou remova perfis guardados neste navegador."], ["Add vehicle", "Adicionar veículo"], ["No vehicles saved yet.", "Ainda não existem veículos guardados."],
  ["Real consumption", "Consumo real"], ["Fill-up history", "Histórico de abastecimentos"], ["Use two full-tank records, including any partial fills between them, to measure real L/100 km.", "Utilize dois registos de depósito cheio, incluindo abastecimentos parciais intermédios, para medir os L/100 km reais."], ["Add a fill-up", "Adicionar abastecimento"], ["Vehicle", "Veículo"], ["Choose a saved vehicle", "Escolha um veículo guardado"], ["Date", "Data"], ["Fuel type", "Tipo de combustível"], ["Odometer", "Conta-quilómetros"], ["Trip distance", "Distância percorrida"], ["if no odometer", "se não houver conta-quilómetros"], ["Litres added", "Litros adicionados"], ["Price per litre", "Preço por litro"], ["Total paid", "Total pago"], ["Driving type", "Tipo de condução"], ["Mixed", "Mista"], ["City", "Cidade"], ["Motorway", "Autoestrada"], ["Other", "Outra"], ["This was a full tank", "Este abastecimento encheu o depósito"], ["Save fill-up", "Guardar abastecimento"], ["Measured consumption", "Consumo medido"], ["Choose a vehicle with fill-up history.", "Escolha um veículo com histórico de abastecimentos."], ["Fill-up records", "Registos de abastecimento"], ["Distance", "Distância"], ["Litres", "Litros"], ["Full tank", "Depósito cheio"], ["Driving", "Condução"], ["Actions", "Ações"], ["No fill-ups saved.", "Ainda não existem abastecimentos guardados."],
  ["Saved snapshots", "Registos guardados"], ["Each record preserves the original values used, even if a vehicle profile changes later.", "Cada registo preserva os valores originais, mesmo que o perfil do veículo seja alterado mais tarde."], ["Export CSV", "Exportar CSV"], ["No journeys saved yet.", "Ainda não existem viagens guardadas."],
  ["Preferences & data", "Preferências e dados"], ["Settings", "Definições"], ["Small preferences use localStorage; structured records use IndexedDB on this browser and device.", "As preferências simples utilizam localStorage; os registos estruturados utilizam IndexedDB neste navegador e dispositivo."], ["Calculator preferences", "Preferências da calculadora"], ["Currency", "Moeda"], ["Theme", "Tema"], ["Light", "Claro"], ["Dark", "Escuro"], ["System", "Sistema"], ["Save settings", "Guardar definições"],
  ["Backup & export", "Cópia de segurança e exportação"], ["Backups include calculator vehicles, fill-ups, journeys, price history, and preferences. Imported files are validated before anything changes.", "As cópias incluem veículos, abastecimentos, viagens, histórico de preços e preferências. Os ficheiros importados são validados antes de qualquer alteração."], ["Export JSON backup", "Exportar cópia JSON"], ["Import JSON backup", "Importar cópia JSON"], ["Export vehicles CSV", "Exportar veículos CSV"], ["Export fill-ups CSV", "Exportar abastecimentos CSV"],
  ["Delete calculator data", "Eliminar dados da calculadora"], ["Deletes only Vehicle Cost Calculator records and preferences stored by this browser. It does not affect other EstrelaLua apps, other websites, or exported files.", "Elimina apenas os registos e preferências desta calculadora guardados pelo navegador. Não afeta outras apps EstrelaLua, outros websites ou ficheiros exportados."], ["Delete all local data", "Eliminar todos os dados locais"],
  ["Privacy", "Privacidade"], ["Your journey data belongs to you.", "Os dados das suas viagens pertencem-lhe."], ["Manual calculations, vehicles, fill-ups, and saved journeys remain in this browser. There are no accounts, analytics, telemetry, advertising, or cloud synchronisation. Clearing browser storage may remove saved information, so export a backup when it matters.", "Os cálculos manuais, veículos, abastecimentos e viagens guardadas ficam neste navegador. Não existem contas, análises, telemetria, publicidade ou sincronização cloud. Limpar os dados do navegador pode remover a informação, por isso exporte uma cópia quando for importante."], ["The calculator does not contact mapping, routing, toll, analytics, or cloud services. Enter the distance and prices yourself, then export a backup if you want a copy outside this browser.", "A calculadora não contacta serviços de mapas, rotas, portagens, análise ou cloud. Introduza a distância e os preços e exporte uma cópia se quiser guardar os dados fora deste navegador."],
  ["Vehicle profile", "Perfil do veículo"], ["Make", "Marca"], ["Model", "Modelo"], ["Year", "Ano"], ["Engine description", "Descrição do motor"], ["Registration or nickname", "Matrícula ou alcunha"], ["Manual fuel consumption", "Consumo manual de combustível"], ["Manual electric consumption", "Consumo elétrico manual"], ["Preferred consumption source", "Origem de consumo preferida"], ["Manual", "Manual"], ["Latest-three measured", "Média dos últimos três valores"], ["Overall measured", "Média geral medida"], ["City measured", "Média medida em cidade"], ["Motorway measured", "Média medida em autoestrada"], ["Mixed measured", "Média medida em percurso misto"], ["Maintenance cost per km", "Custo de manutenção por km"], ["Default passengers", "Passageiros predefinidos"], ["Archive this vehicle", "Arquivar este veículo"], ["Cancel", "Cancelar"], ["Save vehicle", "Guardar veículo"],
  ["Import preview", "Pré-visualização da importação"], ["Review this backup", "Rever esta cópia"], ["Replace first creates a safety export download, then clears only this calculator’s data. Merge keeps existing records and replaces only records with matching IDs.", "Substituir cria primeiro uma exportação de segurança e depois limpa apenas os dados desta calculadora. Juntar mantém os registos existentes e substitui apenas os que têm IDs correspondentes."], ["Merge", "Juntar"], ["Replace", "Substituir"], ["Cost name", "Nome do custo"], ["Amount", "Valor"], ["Trademark & copyright", "Marcas e direitos de autor"], ["Run calculator tests", "Executar testes da calculadora"],
  ["Close", "Fechar"], ["Weekend in Porto", "Fim de semana no Porto"], ["My diesel car", "O meu carro a gasóleo"],
];

const normalise = (value) => String(value).replace(/\s+/g, " ").trim();
const lookup = new Map();
for (const [en, pt] of pairs) {
  lookup.set(normalise(en), { en, pt });
  lookup.set(normalise(pt), { en, pt });
}

function translateTree(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.parentElement || node.parentElement.closest("script,style,[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      return normalise(node.nodeValue || "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const pair = lookup.get(normalise(node.nodeValue || ""));
    if (pair) node.nodeValue = pair[currentLanguage];
  }
  root.querySelectorAll?.("[placeholder], [aria-label]").forEach((element) => {
    for (const attribute of ["placeholder", "aria-label"]) {
      const pair = lookup.get(normalise(element.getAttribute(attribute) || ""));
      if (pair) element.setAttribute(attribute, pair[currentLanguage]);
    }
  });
}

function applyLanguage(next) {
  currentLanguage = saveLanguage(next);
  document.documentElement.lang = currentLanguage === "pt" ? "pt-PT" : "en";
  document.title = tr("Vehicle Cost Calculator — EstrelaLuaApps", "Calculadora de Custos de Veículo — EstrelaLuaApps");
  document.querySelector('meta[name="description"]')?.setAttribute("content", tr(
    "Calculate vehicle journey costs using distance, real consumption, tolls, parking, maintenance, and passenger sharing.",
    "Calcule custos de viagens com distância, consumo real, portagens, estacionamento, manutenção e partilha por passageiros.",
  ));
  translateTree(document.body);
}

export function initialiseVehicleLanguage(onChange) {
  createLanguageSwitch({
    container: document.querySelector("#language-switch"),
    language: currentLanguage,
    onChange(next) { applyLanguage(next); onChange?.(next); },
  });
  applyLanguage(currentLanguage);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) translateTree(node);
        else if (node.nodeType === Node.TEXT_NODE && node.parentElement) translateTree(node.parentElement);
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
