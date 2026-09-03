import { createLanguageSwitch, getLanguage, saveLanguage } from "./assets/i18n-core.js";

const pairs = [
  ["Skip to content", "Saltar para o conteúdo"],
  ["Open navigation", "Abrir navegação"],
  ["Main navigation", "Navegação principal"],
  ["EstrelaLua logo over an illustrated ocean scene", "Logótipo EstrelaLua sobre uma ilustração do oceano"],
  ["Skip to calculator", "Saltar para a calculadora"],
  ["Apps", "Apps"],
  ["Contact", "Contacto"],
  ["Explore the apps", "Explorar as apps"],
  ["Home", "Início"],
  ["All apps", "Todas as apps"],
  ["Open", "Abrir"],
  ["View on GitHub", "Ver no GitHub"],
  ["Download latest", "Transferir versão mais recente"],
  ["Made by the Atlantic", "Criadas junto ao Atlântico"],
  ["Bright ideas.", "Ideias luminosas."],
  ["Beautifully made.", "Feitas com cuidado."],
  ["Welcome to EstrelaLuaApps — a home for simple, thoughtful digital experiences inspired by the calm and colour of the coast.", "Bem-vindo à EstrelaLuaApps — um espaço para experiências digitais simples e cuidadas, inspiradas pela calma e pelas cores da costa."],
  ["Discover the apps", "Descobrir as apps"],
  ["Independent & intentional", "Independente e intencional"],
  ["Made with care in Portugal", "Feito com cuidado em Portugal"],
  ["Sunny thinking", "Ideias ao sol"],
  ["Calm by design", "Calma por natureza"],
  ["From my desk", "Da minha secretária"],
  ["Small apps.", "Pequenas apps."],
  ["Useful ideas.", "Ideias úteis."],
  ["A growing collection of focused tools for desktop and web, each designed to make an everyday task feel simpler.", "Uma coleção crescente de ferramentas focadas para computador e web, concebidas para simplificar tarefas do dia a dia."],
  ["A growing collection of focused tools for desktop and web. Select an app to learn more, download it, or use it directly online.", "Uma coleção crescente de ferramentas focadas para computador e web. Escolha uma app para saber mais, transferi-la ou utilizá-la diretamente online."],
  ["Explore the collection", "Explorar a coleção"],
  ["Windows apps", "Apps Windows"],
  ["Tools for your desktop", "Ferramentas para o computador"],
  ["5 apps · Windows 10 & 11", "5 apps · Windows 10 e 11"],
  ["Web apps", "Web apps"],
  ["Open in any modern browser", "Abrir em qualquer navegador moderno"],
  ["6 apps · No installation", "6 apps · Sem instalação"],
  ["7 apps · No installation", "7 apps · Sem instalação"],
  ["Windows 10 & 11", "Windows 10 e 11"],
  ["Web app · Beta", "Web app · Beta"],
  ["Web app · New", "Web app · Nova"],
  ["App launcher", "Lançador de aplicações"],
  ["Focus timer", "Temporizador de foco"],
  ["Macro utility", "Utilitário de macros"],
  ["Image utility", "Utilitário de imagens"],
  ["Shutdown scheduler", "Agendador de encerramento"],
  ["Travel cost calculator", "Calculadora de custos de viagem"],
  ["Household energy calculator", "Calculadora de energia doméstica"],
  ["Spontaneous trip generator", "Gerador de viagens espontâneas"],
  ["Navigation link converter", "Conversor de links de navegação"],
  ["Sourced cooldown database", "Base de dados de tempos de espera com fontes"],
  ["Couples expense splitter", "Divisão de despesas para casais"],
  ["Private metadata inspector", "Inspetor privado de metadados"],
  ["Keep your desktop clean. Organize apps and shortcuts into categories, add favourites, and launch everything from one place.", "Mantenha o ambiente de trabalho organizado. Agrupe aplicações e atalhos por categorias, adicione favoritos e abra tudo num único lugar."],
  ["A calm, local-only study timer with custom focus cycles, compact mode, long breaks, and seven-day statistics.", "Um temporizador de estudo tranquilo e local, com ciclos de foco personalizados, modo compacto, pausas longas e estatísticas de sete dias."],
  ["Record keyboard events and mouse clicks, save reusable macros, and play them back with configurable hotkeys.", "Grave eventos do teclado e cliques do rato, guarde macros reutilizáveis e reproduza-as com atalhos configuráveis."],
  ["Convert, resize, crop, trim, and clean up images locally—with broad format support and tools for transparent backgrounds.", "Converta, redimensione, recorte e limpe imagens localmente, com suporte para vários formatos e ferramentas para fundos transparentes."],
  ["Convert, resize, crop, trim, and clean up images locally, with broad format support and tools for transparent backgrounds.", "Converta, redimensione, recorte e limpe imagens localmente, com suporte para vários formatos e ferramentas para fundos transparentes."],
  ["Schedule a daily shutdown, receive a clear countdown warning, and control how many times it may be delayed.", "Agende o encerramento diário, receba um aviso com contagem decrescente e controle quantas vezes pode ser adiado."],
  ["Estimate fuel, electricity, tolls, parking, maintenance, and shared passenger costs using your vehicle’s real consumption.", "Estime combustível, eletricidade, portagens, estacionamento, manutenção e custos partilhados com base no consumo real do veículo."],
  ["Estimate how much electricity each appliance uses and see your daily, monthly, and yearly household energy costs.", "Estime o consumo elétrico de cada aparelho e consulte os custos domésticos diários, mensais e anuais."],
  ["Choose a district, locality, driving range, and mood—then reveal one of more than 130 sourced Portuguese destinations.", "Escolha um distrito, localidade, alcance e ambiente — e descubra um de mais de 130 destinos portugueses com fontes."],
  ["Paste a map link, address, place name, or coordinates and open the same destination in your preferred navigation app.", "Cole um link de mapa, morada, local ou coordenadas e abra o mesmo destino na sua app de navegação preferida."],
  ["Search business cooldowns, production cycles, mission limits, deliveries, and resets with conditions and source links.", "Pesquise tempos de espera, ciclos de produção, limites de missões, entregas e reinícios, com condições e fontes."],
  ["Compare a 50/50 split with contributions based on each person’s income, shared expenses, and remaining monthly budget.", "Compare uma divisão 50/50 com contribuições baseadas no rendimento, despesas comuns e orçamento mensal restante de cada pessoa."],
  ["Understand the camera data, dates, location, technical details, and privacy exposure hidden inside photos and videos.", "Compreenda os dados da câmara, datas, localização, detalhes técnicos e exposição de privacidade ocultos em fotografias e vídeos."],
  ["Open Fair Share details", "Abrir detalhes da Fair Share"],
  ["Open Media Inspector details", "Abrir detalhes do Media Inspector"],
  ["Support & contact", "Apoio e contacto"],
  ["Questions, bugs or", "Dúvidas, erros ou"],
  ["bright ideas?", "boas ideias?"],
  ["Choose the relevant app and open its GitHub repository to report a problem, ask a question, or suggest a feature through the Issues tab.", "Escolha a app relevante e abra o respetivo repositório no GitHub para comunicar um problema, fazer uma pergunta ou sugerir uma funcionalidade através do separador Issues."],
  ["Choose an app", "Escolher uma app"],
  ["Visit GitHub", "Visitar o GitHub"],
  ["Made under the Portuguese sun.", "Feito sob o sol português."],
  ["EstrelaLuaApps™. Made under the Portuguese sun.", "EstrelaLuaApps™. Feito sob o sol português."],
  ["Trademark & copyright", "Marcas e direitos de autor"],
  ["Independent software, made with care in Portugal.", "Software independente, feito com cuidado em Portugal."],
  ["What it does", "O que faz"],
  ["At a glance", "Resumo"],
  ["Platform", "Plataforma"],
  ["Installation", "Instalação"],
  ["Data", "Dados"],
  ["Data storage", "Armazenamento de dados"],
  ["Privacy", "Privacidade"],
  ["Best for", "Ideal para"],
  ["Account", "Conta"],
  ["None", "Nenhuma"],
  ["Not required", "Não necessária"],
  ["Modern web browser", "Navegador moderno"],
  ["Portable `.exe`—no installer", "`.exe` portátil — sem instalador"],
  ["Portable `.exe`—no installer or administrator access required", "`.exe` portátil — sem instalador nem acesso de administrador"],
  ["64-bit Windows 10 and Windows 11", "Windows 10 e Windows 11 de 64 bits"],
  ["Windows 10 and Windows 11", "Windows 10 e Windows 11"],
  ["Everything you launch,", "Tudo o que abre,"],
  ["all in one place.", "num único lugar."],
  ["Add apps and shortcuts, organize them into categories, keep favourites close, and clear the clutter from your Windows desktop. Allin1APP is portable and remembers your setup locally.", "Adicione aplicações e atalhos, organize-os por categorias, mantenha os favoritos por perto e liberte o ambiente de trabalho do Windows. A Allin1APP é portátil e guarda a configuração localmente."],
  ["Add `.exe` apps and `.lnk` shortcuts", "Adicionar aplicações `.exe` e atalhos `.lnk`"],
  ["Drag, drop, and bulk-import desktop shortcuts", "Arrastar, largar e importar atalhos em conjunto"],
  ["Categories, favourites, custom names, and icons", "Categorias, favoritos, nomes e ícones personalizados"],
  ["Light and dark themes", "Temas claro e escuro"],
  ["System tray and optional Windows startup", "Área de notificação e arranque opcional com o Windows"],
  ["Portable—no installer or Python required", "Portátil — sem instalador nem Python"],
  ["Stored locally in `%APPDATA%\\Allin1APP`", "Guardado localmente em `%APPDATA%\\Allin1APP`"],
  ["Organizing and launching apps from one place", "Organizar e abrir aplicações num único lugar"],
  ["Get Allin1APP", "Obter Allin1APP"],
  ["Windows app launcher", "Lançador de aplicações para Windows"],
  ["A lightweight launcher that keeps your desktop clean by bringing apps and shortcuts together in one organized window.", "Um lançador leve que mantém o ambiente de trabalho organizado ao reunir aplicações e atalhos numa única janela."],
  ["Private focus timer", "Temporizador de foco privado"],
  ["A calm study timer for custom focus and rest cycles—with a compact always-on-top view and useful seven-day statistics.", "Um temporizador de estudo tranquilo para ciclos personalizados de foco e descanso, com uma vista compacta sempre visível e estatísticas úteis de sete dias."],
  ["Focus deeply.", "Concentre-se a fundo."],
  ["Rest deliberately.", "Descanse com intenção."],
  ["Choose your study and rest durations, build repeating cycles, add optional long breaks, and keep a compact timer above your other windows. Foculume works entirely on your computer.", "Escolha a duração do estudo e do descanso, crie ciclos repetidos, adicione pausas longas opcionais e mantenha um temporizador compacto sobre as outras janelas. A Foculume funciona inteiramente no seu computador."],
  ["Custom study, rest, and long-break durations", "Durações personalizadas de estudo, descanso e pausa longa"],
  ["Optional cycle limits and automatic transitions", "Limites de ciclos opcionais e transições automáticas"],
  ["Compact always-on-top timer", "Temporizador compacto sempre visível"],
  ["Seven days of detailed statistics", "Sete dias de estatísticas detalhadas"],
  ["Light and dark themes with tray support", "Temas claro e escuro com suporte na área de notificação"],
  ["No accounts, telemetry, or external services", "Sem contas, telemetria ou serviços externos"],
  ["Local-only with no accounts or telemetry", "Apenas local, sem contas nem telemetria"],
  ["Study sessions, focus cycles, and mindful breaks", "Sessões de estudo, ciclos de foco e pausas conscientes"],
  ["Get Foculume", "Obter Foculume"],
  ["Portable macro utility", "Utilitário portátil de macros"],
  ["Record keyboard events and mouse clicks, save reusable macros, and play them back with hotkeys you control.", "Grave eventos do teclado e cliques do rato, guarde macros reutilizáveis e reproduza-as com atalhos definidos por si."],
  ["Record the routine.", "Grave a rotina."],
  ["Replay the result.", "Reproduza o resultado."],
  ["MacroAPP turns repeatable keyboard and mouse sequences into saved macros. Record an action once, assign the controls you prefer, and play it back whenever you need it.", "A MacroAPP transforma sequências repetitivas de teclado e rato em macros guardadas. Grave uma ação, escolha os controlos e reproduza-a quando precisar."],
  ["Record keyboard events and mouse clicks", "Gravar eventos do teclado e cliques do rato"],
  ["Save and load reusable macros", "Guardar e carregar macros reutilizáveis"],
  ["Configurable record, stop, and playback hotkeys", "Atalhos configuráveis para gravar, parar e reproduzir"],
  ["Dedicated emergency-stop hotkey", "Atalho dedicado de paragem de emergência"],
  ["Portable and local—no network connection", "Portátil e local — sem ligação à rede"],
  ["Stored locally in `%APPDATA%\\MacroAPP`", "Guardado localmente em `%APPDATA%\\MacroAPP`"],
  ["Repeating keyboard and mouse routines", "Repetir rotinas de teclado e rato"],
  ["Get MacroAPP", "Obter MacroAPP"],
  ["Private image utility", "Utilitário de imagens privado"],
  ["Convert, resize, crop, trim, and clean up images without uploading them anywhere. Everything runs locally on your Windows computer.", "Converta, redimensione, recorte e limpe imagens sem as enviar para qualquer serviço. Tudo funciona localmente no seu computador Windows."],
  ["Shape every image.", "Dê forma a cada imagem."],
  ["Keep it private.", "Mantenha-a privada."],
  ["Pixevra brings common image tasks into one portable desktop app. Convert between popular formats, resize and crop precisely, build Windows icons, trim empty space, and clean up unwanted backgrounds.", "A Pixevra reúne tarefas comuns de imagem numa app portátil. Converta formatos, redimensione e recorte com precisão, crie ícones do Windows, remova espaços vazios e limpe fundos indesejados."],
  ["Convert PNG, JPG, WEBP, BMP, TIFF, GIF, and ICO", "Converter PNG, JPG, WEBP, BMP, TIFF, GIF e ICO"],
  ["Resize while preserving aspect ratio", "Redimensionar preservando a proporção"],
  ["Crop manually or trim transparent space", "Recortar manualmente ou remover espaço transparente"],
  ["Create multi-size Windows ICO files", "Criar ficheiros ICO do Windows com vários tamanhos"],
  ["Remove white and edge-connected backgrounds", "Remover fundos brancos e ligados às margens"],
  ["Batch-convert selected images", "Converter imagens selecionadas em lote"],
  ["Polish transparency edges and preview output", "Aperfeiçoar margens transparentes e pré-visualizar o resultado"],
  ["Dark and light themes with saved settings", "Temas escuro e claro com definições guardadas"],
  ["Local-only with no accounts, telemetry, ads, cloud, or AI processing", "Apenas local, sem contas, telemetria, publicidade, cloud ou processamento por IA"],
  ["Converting, resizing, cropping, and cleaning up images", "Converter, redimensionar, recortar e limpar imagens"],
  ["Get Pixevra", "Obter Pixevra"],
  ["Schedule a daily Windows shutdown with a clear countdown warning, controlled delay attempts, and optional password protection.", "Agende o encerramento diário do Windows com um aviso claro, adiamentos controlados e proteção opcional por palavra-passe."],
  ["Shut down on time.", "Encerre a horas."],
  ["Stay in control.", "Mantenha o controlo."],
  ["Halvynox helps a Windows computer follow a reliable daily shutdown schedule. Before shutting down, it displays a live countdown and lets the user delay the action while configured attempts remain. Because it initiates a real shutdown, save open work before the scheduled time.", "A Halvynox ajuda um computador Windows a cumprir um horário diário de encerramento. Antes de desligar, mostra uma contagem decrescente e permite adiar enquanto existirem tentativas. Como inicia um encerramento real, guarde o trabalho antes da hora programada."],
  ["Schedule one daily shutdown time", "Agendar uma hora diária de encerramento"],
  ["See a warning popup with a live countdown", "Ver um aviso com contagem decrescente em tempo real"],
  ["Configure a limited number of delay attempts", "Configurar um número limitado de adiamentos"],
  ["Keep delay tracking across restarts and midnight", "Manter os adiamentos após reinícios e a passagem da meia-noite"],
  ["Protect settings and tray exit with a password", "Proteger definições e saída com palavra-passe"],
  ["Start automatically with Windows", "Iniciar automaticamente com o Windows"],
  ["Minimize quietly to the system tray", "Minimizar discretamente para a área de notificação"],
  ["Choose between light and dark themes", "Escolher entre temas claro e escuro"],
  ["Settings and password hash stay local, with no usage information sent online", "As definições e o hash da palavra-passe ficam localmente, sem envio de informações de utilização"],
  ["Enforcing a predictable daily computer shutdown routine", "Garantir uma rotina previsível de encerramento diário"],
  ["Get Halvynox", "Obter Halvynox"],
  ["Travel cost calculator · Web beta", "Calculadora de custos de viagem · Web beta"],
  ["Estimate fuel, electricity, tolls, parking, maintenance, and passenger costs using your vehicle’s real-world consumption.", "Estime combustível, eletricidade, portagens, estacionamento, manutenção e custos por passageiro com base no consumo real do veículo."],
  ["Calculate", "Calcular"],
  ["Know the real cost", "Conheça o custo real"],
  ["of every journey.", "de cada viagem."],
  ["Build a journey estimate from the distance, vehicle consumption, energy price, tolls, and other costs you enter. Vehicle profiles, measured fill-up consumption, saved journeys, and backups stay in this browser unless you export them yourself.", "Crie uma estimativa a partir da distância, consumo do veículo, preço da energia, portagens e outros custos introduzidos. Perfis, consumos medidos, viagens e cópias de segurança ficam neste navegador, exceto quando os exporta."],
  ["Petrol, diesel, LPG, hybrid, plug-in hybrid, and electric vehicles", "Veículos a gasolina, gasóleo, GPL, híbridos, híbridos plug-in e elétricos"],
  ["Simple one-way and return journeys", "Viagens simples de ida e ida e volta"],
  ["Manual distance, duration, and toll entries with clear cost breakdowns", "Distância, duração e portagens manuais com discriminação clara dos custos"],
  ["Optional journey names and notes for saved calculations", "Nomes e notas opcionais nas viagens guardadas"],
  ["Fill-up tracking for measured older-vehicle consumption", "Registo de abastecimentos para medir o consumo real"],
  ["Parking, ferry, maintenance, and custom expenses", "Estacionamento, ferry, manutenção e despesas personalizadas"],
  ["Cost per passenger, printable summaries, and local exports", "Custo por passageiro, resumos imprimíveis e exportações locais"],
  ["No account, analytics, advertising, or telemetry", "Sem conta, análises, publicidade ou telemetria"],
  ["Privacy by default", "Privacidade por predefinição"],
  ["Calculations run entirely in your browser. Vehicles, fill-ups, and saved journeys remain on this device. The app does not use mapping, routing, toll, analytics, or cloud services, so you stay in control of every value used in the estimate.", "Os cálculos são feitos inteiramente no navegador. Veículos, abastecimentos e viagens guardadas permanecem neste dispositivo. A app não usa serviços de mapas, rotas, portagens, análise ou cloud, mantendo-o no controlo de todos os valores."],
  ["Stored locally in the current browser and device", "Guardado localmente no navegador e dispositivo atuais"],
  ["Route details", "Detalhes da rota"],
  ["Entered manually", "Introduzidos manualmente"],
  ["Estimating and sharing vehicle journey costs", "Estimar e partilhar custos de viagens de automóvel"],
  ["Household energy calculator · Web beta", "Calculadora de energia doméstica · Web beta"],
  ["See how much electricity your appliances use and estimate the real cost of running your home.", "Veja quanta eletricidade os aparelhos consomem e estime o custo real de manter a casa."],
  ["Understand where your", "Perceba para onde vai a"],
  ["electricity goes.", "eletricidade."],
  ["Enter the energy and contracted-power prices from your bill, then fill in whichever appliance values you know. Measured monthly kWh is used directly; when it is empty, the calculator estimates from power and running time.", "Introduza os preços da energia e potência contratada da fatura e preencha os dados conhecidos dos aparelhos. Os kWh mensais medidos são usados diretamente; se estiverem vazios, a calculadora estima a partir da potência e do tempo de utilização."],
  ["Daily, monthly, and yearly electricity estimates", "Estimativas diárias, mensais e anuais de eletricidade"],
  ["Appliance-by-appliance kWh and cost breakdown", "Discriminação de kWh e custo por aparelho"],
  ["Power, time, and measured kWh visible together", "Potência, tempo e kWh medidos visíveis em conjunto"],
  ["Daily contracted-power price and billing-period calculation", "Preço diário da potência contratada e cálculo do período de faturação"],
  ["Optional fixed monthly electricity charge", "Encargo mensal fixo de eletricidade opcional"],
  ["Highlights the appliances using the most energy", "Destaque dos aparelhos com maior consumo"],
  ["Blocks letters and invalid values in numeric fields", "Bloqueio de letras e valores inválidos nos campos numéricos"],
  ["Saves the current household setup in this browser", "Guarda a configuração atual da casa neste navegador"],
  ["Private by default", "Privada por predefinição"],
  ["All calculations run on this device. Appliance details and prices stay in the current browser and are never uploaded by the calculator.", "Todos os cálculos são feitos neste dispositivo. Os dados dos aparelhos e preços ficam no navegador atual e nunca são enviados pela calculadora."],
  ["Current browser and device only", "Apenas no navegador e dispositivo atuais"],
  ["Input", "Dados introduzidos"],
  ["Manual appliance and tariff values", "Valores manuais dos aparelhos e tarifário"],
  ["Estimating household electricity use", "Estimar o consumo elétrico doméstico"],
  ["Spontaneous trip generator · Web app", "Gerador de viagens espontâneas · Web app"],
  ["Turn “we should go somewhere” into a sourced Portuguese destination, a rough route, and a three-stop plan.", "Transforme «devíamos ir a algum lado» num destino português com fontes, uma rota aproximada e um plano de três paragens."],
  ["Spin a trip", "Sortear uma viagem"],
  ["Give the road", "Dê à estrada"],
  ["the final vote.", "a decisão final."],
  ["Choose a Portuguese district and locality, a comfortable distance, and a mood. The roulette selects from more than 130 destinations researched across official tourism pages, independent travel guides, and community recommendations. Every result explains why it matched and links to its inspiration source before handing the exact route to Google Maps.", "Escolha um distrito e localidade de Portugal, uma distância confortável e um ambiente. A roleta seleciona entre mais de 130 destinos pesquisados em turismo oficial, guias independentes e recomendações da comunidade. Cada resultado explica a escolha, liga à fonte de inspiração e abre a rota exata no Google Maps."],
  ["More than 130 sourced Portuguese destinations", "Mais de 130 destinos portugueses com fontes"],
  ["Official, independent, and community inspiration", "Inspiração oficial, independente e da comunidade"],
  ["Coast, nature, history, food, and viewpoint moods", "Ambientes de costa, natureza, história, gastronomia e miradouros"],
  ["Nearby, day-trip, and weekend distance ranges", "Alcances para perto, um dia e fim de semana"],
  ["Interactive visual route across Portugal", "Rota visual interativa por Portugal"],
  ["Three-stop mini itinerary for every destination", "Mini-itinerário de três paragens para cada destino"],
  ["Curated Google Maps target for every suggested stop", "Destino verificado no Google Maps para cada paragem sugerida"],
  ["English and Portuguese interface", "Interface em inglês e português"],
  ["Surprise without surveillance", "Surpresa sem vigilância"],
  ["The roulette does not request your GPS location. Choose a district and locality manually; saved trips stay in the current browser. Google receives the public place names only if you choose to open directions or a suggested stop.", "A roleta não pede a localização GPS. Escolha manualmente um distrito e uma localidade; as viagens guardadas ficam no navegador atual. A Google só recebe nomes públicos de locais quando decide abrir direções ou uma paragem sugerida."],
  ["Coverage", "Cobertura"],
  ["Mainland Portugal", "Portugal continental"],
  ["Destinations", "Destinos"],
  ["More than 130 sourced ideas", "Mais de 130 ideias com fontes"],
  ["Cost", "Custo"],
  ["Free; no paid map service", "Grátis; sem serviço de mapas pago"],
  ["Route data", "Dados de rota"],
  ["Approximate until opened in Google Maps", "Aproximados até abrir no Google Maps"],
  ["Spontaneous day trips and weekend ideas", "Passeios espontâneos de um dia e fins de semana"],
  ["Navigation link converter · Web app", "Conversor de links de navegação · Web app"],
  ["Paste one destination and open it in the map app you actually want to use.", "Cole um destino e abra-o na app de mapas que realmente quer utilizar."],
  ["Switch maps", "Trocar de mapa"],
  ["One place.", "Um lugar."],
  ["Your map.", "O seu mapa."],
  ["Paste a supported map link, coordinates, an address, or a place name. The switcher extracts the destination locally and creates a fresh link for the navigation service you select.", "Cole um link de mapa suportado, coordenadas, uma morada ou o nome de um local. O conversor extrai o destino localmente e cria um novo link para o serviço de navegação escolhido."],
  ["Google Maps, Waze, Apple Maps, Bing Maps, and OpenStreetMap", "Google Maps, Waze, Apple Maps, Bing Maps e OpenStreetMap"],
  ["Accepts full map links, place names, addresses, and coordinates", "Aceita links completos, nomes de locais, moradas e coordenadas"],
  ["Automatically detects destinations while you paste or type", "Deteta automaticamente destinos ao colar ou escrever"],
  ["Preserves exact coordinates when the source link contains them", "Preserva coordenadas exatas quando o link de origem as inclui"],
  ["Clear warning when a shortened link hides its destination", "Aviso claro quando um link encurtado esconde o destino"],
  ["No account, API key, installation, or saved history", "Sem conta, chave de API, instalação ou histórico guardado"],
  ["Converted on this device", "Convertido neste dispositivo"],
  ["The pasted text is processed in the current browser. Nothing is uploaded or stored. A map provider receives the destination only after you choose to open its link.", "O texto colado é processado no navegador atual. Nada é enviado ou guardado. O fornecedor de mapas só recebe o destino depois de escolher abrir o respetivo link."],
  ["Map link, place, address, or coordinates", "Link de mapa, local, morada ou coordenadas"],
  ["Map services", "Serviços de mapas"],
  ["Five supported destinations", "Cinco serviços suportados"],
  ["Opening a shared place in a different navigation app", "Abrir um local partilhado noutra app de navegação"],
  ["Sourced player tracker · Web app", "Rastreador de jogador com fontes · Web app"],
  ["Know what is cooling down, what keeps producing, and what you can do next.", "Saiba o que está em espera, o que continua a produzir e o que pode fazer a seguir."],
  ["Open the tracker", "Abrir o rastreador"],
  ["Less waiting.", "Menos espera."],
  ["Better rotations.", "Melhores rotações."],
  ["Search major GTA Online businesses and activities by category, timer type, scope, or whether another job can be completed while the clock runs. Start verified fixed-duration timers and keep every active cooldown visible while you plan the next job.", "Pesquise os principais negócios e atividades do GTA Online por categoria, tipo de temporizador, âmbito ou possibilidade de fazer outro trabalho durante a espera. Inicie temporizadores de duração fixa verificados e mantenha todos os tempos ativos visíveis enquanto planeia o trabalho seguinte."],
  ["Live countdowns that persist after a refresh", "Contagens decrescentes que persistem após atualizar a página"],
  ["Reset, restart, remove, and clear-finished controls", "Controlos para repor, reiniciar, remover e limpar concluídos"],
  ["Passive production and supply delivery times", "Tempos de produção passiva e entrega de provisões"],
  ["Property-specific versus global scope", "Âmbito específico da propriedade ou global"],
  ["Conditions, upgrades, crew-size exceptions, and offline behavior", "Condições, melhorias, exceções por tamanho da equipa e comportamento offline"],
  ["Sources, evidence labels, and last-verified dates", "Fontes, etiquetas de evidência e datas da última verificação"],
  ["Your timers stay on your device", "Os temporizadores ficam no seu dispositivo"],
  ["Active countdowns are saved only in this browser. No account, installation, or gameplay connection is required.", "As contagens ativas são guardadas apenas neste navegador. Não é necessária conta, instalação ou ligação ao jogo."],
  ["Major businesses, heists, and repeatable work", "Principais negócios, golpes e trabalhos repetíveis"],
  ["Evidence", "Evidência"],
  ["Official and clearly labelled community-tested sources", "Fontes oficiais e testes da comunidade claramente identificados"],
  ["Verified", "Verificado"],
  ["30 August 2026", "30 de agosto de 2026"],
  ["Status", "Estado"],
  ["Reference and live tracker", "Referência e rastreador em tempo real"],
  ["Couples' expenses · Web app", "Despesas a dois · Web app"],
  ["Compare ways to split shared expenses and see the real impact on each person's budget.", "Compare formas de dividir as despesas comuns e veja o impacto real no orçamento de cada pessoa."],
  ["Open calculator", "Abrir calculadora"],
  ["More clarity.", "Mais clareza."],
  ["Fewer assumptions.", "Menos suposições."],
  ["Enter both monthly incomes and all shared expenses. The app calculates each person's share of the total income, suggests how much each would pay, and shows what remains at the end of the month.", "Introduza os rendimentos mensais e todas as despesas comuns. A aplicação calcula a percentagem de rendimento de cada pessoa, sugere quanto cada uma pagaria e mostra quanto fica disponível no final do mês."],
  ["Custom incomes and names", "Rendimentos e nomes personalizados"],
  ["Unlimited shared expenses", "Despesas comuns ilimitadas"],
  ["Income-proportional split", "Divisão proporcional aos rendimentos"],
  ["Direct comparison with 50/50", "Comparação direta com 50/50"],
  ["Remaining amount for each person", "Valor restante para cada pessoa"],
  ["Included €1,000 and €1,500 example", "Exemplo de 1.000 € e 1.500 € incluído"],
  ["Private by design", "Privada por natureza"],
  ["Incomes, expenses, and preferences stay only in the current browser. There is no account and no financial information is sent.", "Os rendimentos, despesas e preferências ficam apenas no navegador atual. Não existe conta nem envio de informação financeira."],
  ["Currency", "Moeda"],
  ["Methods", "Métodos"],
  ["Proportional and 50/50", "Proporcional e 50/50"],
  ["Stored locally", "Guardados localmente"],
  ["Language", "Idioma"],
  ["Portuguese and English", "Português e inglês"],
  ["Portuguese", "Português"],
  ["Private metadata inspector · Web app", "Inspetor privado de metadados · Web app"],
  ["See what a photo or video reveals—without sending the original file anywhere.", "Veja o que uma fotografia ou vídeo revela — sem enviar o ficheiro original para lado nenhum."],
  ["Open inspector", "Abrir inspetor"],
  ["Hidden details.", "Detalhes ocultos."],
  ["Made understandable.", "Explicados com clareza."],
  ["Drop a common photo or video and Media Inspector reads its embedded metadata locally. It turns technical tags into a readable report, keeps the original structures available in Advanced mode, and flags information that could affect your privacy.", "Largue uma fotografia ou vídeo comum e o Media Inspector lê localmente os metadados incorporados. Transforma etiquetas técnicas num relatório legível, mantém as estruturas originais disponíveis no modo Avançado e assinala informações que podem afetar a sua privacidade."],
  ["Local image and video analysis", "Análise local de imagens e vídeos"],
  ["Camera, lens, capture, and date details", "Detalhes da câmara, objetiva, captura e datas"],
  ["Video and embedded audio streams", "Fluxos de vídeo e áudio incorporado"],
  ["Rule-based privacy scanner", "Análise de privacidade baseada em regras"],
  ["Searchable raw metadata explorer", "Explorador pesquisável de metadados originais"],
  ["Consent-first GPS map", "Mapa GPS carregado apenas com consentimento"],
  ["Your media stays on your device", "Os seus ficheiros ficam no seu dispositivo"],
  ["The file and its metadata are analysed in this browser. The original media is not uploaded or stored, and an external map is loaded only if you explicitly choose it.", "O ficheiro e os respetivos metadados são analisados neste navegador. O conteúdo original não é enviado nem guardado e o mapa externo só é carregado se o escolher explicitamente."],
  ["Processing", "Processamento"],
  ["On this device", "Neste dispositivo"],
  ["Images", "Imagens"],
  ["Video", "Vídeo"],
  ["* Metadata reading and preview support can vary by browser and file encoding.", "* A leitura de metadados e a pré-visualização podem variar conforme o navegador e a codificação do ficheiro."],
  ["Brand notice", "Aviso de marca"],
  ["Trademark &", "Marcas e"],
  ["copyright.", "direitos de autor."],
  ["This page identifies the EstrelaLuaApps brand and explains how its name, identity, and original website material may be used.", "Esta página identifica a marca EstrelaLuaApps e explica como podem ser utilizados o seu nome, identidade e conteúdos originais do website."],
  ["Trademark notice", "Aviso de marca"],
  ["EstrelaLuaApps™, the EstrelaLuaApps name, and the associated EstrelaLuaApps logo are used by the creator and owner of EstrelaLuaApps to identify software applications, related downloads, and this official website.", "EstrelaLuaApps™, o nome EstrelaLuaApps e o logótipo associado são utilizados pelo criador e proprietário para identificar aplicações, transferências relacionadas e este website oficial."],
  [", the EstrelaLuaApps name, and the associated EstrelaLuaApps logo are used by the creator and owner of EstrelaLuaApps to identify software applications, related downloads, and this official website.", ", o nome EstrelaLuaApps e o logótipo associado são utilizados pelo criador e proprietário para identificar aplicações, transferências relacionadas e este website oficial."],
  ["No permission is granted to use these brand identifiers in a way that is likely to confuse users or falsely suggest affiliation, sponsorship, endorsement, or official origin.", "Não é concedida autorização para utilizar estes identificadores de forma suscetível de confundir utilizadores ou sugerir falsamente afiliação, patrocínio, aprovação ou origem oficial."],
  ["Copyright notice", "Aviso de direitos de autor"],
  ["Unless expressly stated otherwise, the original text, graphics, visual design, brand artwork, and other original material presented on this website are © 2026 the creator of EstrelaLuaApps. All rights reserved.", "Salvo indicação expressa em contrário, os textos, gráficos, design visual, elementos da marca e restantes materiais originais deste website são © 2026 do criador da EstrelaLuaApps. Todos os direitos reservados."],
  ["Access to this public website does not transfer ownership of its protected material or grant permission to copy, rebrand, redistribute, or commercially exploit it.", "O acesso a este website público não transfere a propriedade dos materiais protegidos nem concede autorização para os copiar, alterar a marca, redistribuir ou explorar comercialmente."],
  ["Application identities", "Identidade das aplicações"],
  ["Allin1APP, Foculume, MacroAPP, Pixevra, Halvynox, Vehicle Cost Calculator, their official icons, and their original product identities are presented as applications belonging to the EstrelaLuaApps collection. Their individual repositories or information pages may contain additional usage-rights notices.", "Allin1APP, Foculume, MacroAPP, Pixevra, Halvynox, Vehicle Cost Calculator, os respetivos ícones oficiais e identidades originais são apresentados como aplicações da coleção EstrelaLuaApps. Os repositórios ou páginas individuais podem conter avisos adicionais sobre direitos de utilização."],
  ["Third-party rights", "Direitos de terceiros"],
  ["Any third-party names, product names, file-format names, operating-system names, or other third-party marks mentioned on this website remain the property of their respective owners. Their mention does not imply endorsement or affiliation.", "Quaisquer nomes de terceiros, produtos, formatos de ficheiro, sistemas operativos ou outras marcas mencionadas pertencem aos respetivos proprietários. A sua menção não implica aprovação ou afiliação."],
  ["Registration status:", "Estado do registo:"],
  ["The ™ symbol identifies EstrelaLuaApps as a claimed brand. It does not represent that the mark is registered. The ® symbol will not be used unless and until a registration is granted. This notice provides general information and is not legal advice.", "O símbolo ™ identifica EstrelaLuaApps como marca reivindicada. Não significa que a marca esteja registada. O símbolo ® não será utilizado até que seja concedido um registo. Este aviso fornece informação geral e não constitui aconselhamento jurídico."],
  ["All rights reserved.", "Todos os direitos reservados."],
  ["Return home", "Voltar ao início"],
];

const pageMeta = {
  "/index.html": {
    en: ["EstrelaLuaApps — Bright ideas, beautifully made", "EstrelaLuaApps creates thoughtful apps inspired by the calm, colour, and possibility of the coast."],
    pt: ["EstrelaLuaApps — Ideias luminosas, feitas com cuidado", "A EstrelaLuaApps cria aplicações cuidadas, inspiradas pela calma, pelas cores e pelas possibilidades da costa."],
  },
  "/apps.html": {
    en: ["Apps — EstrelaLuaApps", "Explore desktop and browser tools created by EstrelaLuaApps."],
    pt: ["Apps — EstrelaLuaApps", "Explore as ferramentas para computador e navegador criadas pela EstrelaLuaApps."],
  },
  "/legal.html": {
    en: ["Trademark & Copyright — EstrelaLuaApps", "Trademark and copyright notice for EstrelaLuaApps and its official software website."],
    pt: ["Marcas e direitos de autor — EstrelaLuaApps", "Aviso de marcas e direitos de autor da EstrelaLuaApps e do seu website oficial."],
  },
  "/allin1app.html": { en: ["Allin1APP — EstrelaLuaApps", "Allin1APP is a lightweight Windows app launcher that organizes apps and shortcuts in one clean window."], pt: ["Allin1APP — EstrelaLuaApps", "A Allin1APP é um lançador leve para Windows que organiza aplicações e atalhos numa única janela."] },
  "/foculume.html": { en: ["Foculume — EstrelaLuaApps", "Foculume is a private, local Windows study timer for focused study and rest sessions."], pt: ["Foculume — EstrelaLuaApps", "A Foculume é um temporizador de estudo privado e local para sessões de foco e descanso no Windows."] },
  "/macroapp.html": { en: ["MacroAPP — EstrelaLuaApps", "MacroAPP is a portable Windows macro recorder and player for keyboard events and mouse clicks."], pt: ["MacroAPP — EstrelaLuaApps", "A MacroAPP é um gravador e reprodutor portátil de macros de teclado e rato para Windows."] },
  "/pixevra.html": { en: ["Pixevra — EstrelaLuaApps", "Pixevra is a private Windows image utility for converting, resizing, cropping, trimming, and cleaning up images."], pt: ["Pixevra — EstrelaLuaApps", "A Pixevra é um utilitário privado para converter, redimensionar, recortar e limpar imagens no Windows."] },
  "/halvynox.html": { en: ["Halvynox — EstrelaLuaApps", "Halvynox is a lightweight Windows shutdown scheduler with warnings, limited delays, and optional password protection."], pt: ["Halvynox — EstrelaLuaApps", "A Halvynox é um agendador leve de encerramento do Windows com avisos, adiamentos limitados e proteção opcional por palavra-passe."] },
  "/vehicle-cost-calculator.html": { en: ["Vehicle Cost Calculator — EstrelaLuaApps", "Estimate fuel, electricity, tolls, parking, maintenance, and passenger costs with the browser-based Vehicle Cost Calculator."], pt: ["Calculadora de Custos de Veículo — EstrelaLuaApps", "Estime combustível, eletricidade, portagens, estacionamento, manutenção e custos por passageiro no navegador."] },
  "/home-energy-calculator.html": { en: ["Home Energy Calculator — EstrelaLuaApps", "Estimate daily, monthly, and yearly household electricity use and costs with the Home Energy Calculator."], pt: ["Calculadora de Energia Doméstica — EstrelaLuaApps", "Estime o consumo e os custos domésticos de eletricidade diários, mensais e anuais."] },
  "/road-trip-roulette.html": { en: ["Road Trip Roulette — EstrelaLuaApps", "Generate a surprise Portugal road trip with approximate distance, drive time, direction, stops, and exact live directions."], pt: ["Roleta de Viagens — EstrelaLuaApps", "Gere uma viagem surpresa por Portugal com distância, duração, direção, paragens e direções exatas."] },
  "/map-link-switcher.html": { en: ["Map Link Switcher — EstrelaLuaApps", "Convert a map link, address, place name, or coordinates into one-click links for five navigation services."], pt: ["Conversor de Links de Mapas — EstrelaLuaApps", "Converta um link de mapa, morada, local ou coordenadas em links para cinco serviços de navegação."] },
  "/gta-online-timers.html": { en: ["GTA Online Timer Reference — EstrelaLuaApps", "A sourced GTA Online reference for business cooldowns, production cycles, mission limits, deliveries, and resets."], pt: ["Referência de Temporizadores GTA Online — EstrelaLuaApps", "Referência com fontes para tempos de espera, produção, missões, entregas e reinícios do GTA Online."] },
  "/partilha-justa.html": { en: ["Fair Share — EstrelaLuaApps", "Compare a 50/50 split with an income-proportional split for a couple's shared expenses."], pt: ["Fair Share — EstrelaLuaApps", "Compare uma divisão 50/50 com uma divisão proporcional aos rendimentos para as despesas comuns do casal."] },
  "/media-inspector.html": { en: ["Media Inspector — EstrelaLuaApps", "Inspect photo and video metadata locally, understand privacy risks, and explore raw technical details without uploading your media."], pt: ["Media Inspector — EstrelaLuaApps", "Inspecione localmente os metadados de fotografias e vídeos, compreenda os riscos de privacidade e explore detalhes técnicos sem enviar os ficheiros."] },
};

const normalise = (value) => value.replace(/\s+/g, " ").trim();
const lookup = new Map();
for (const [en, pt] of pairs) {
  lookup.set(normalise(en), { en, pt });
  lookup.set(normalise(pt), { en, pt });
}
lookup.set("Português", { en: "Portuguese and English", pt: "Português e inglês" });

let language = getLanguage();

function translateTextNodes(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.parentElement || node.parentElement.closest("script, style, [data-no-translate]")) return NodeFilter.FILTER_REJECT;
      return normalise(node.nodeValue || "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const pair = lookup.get(normalise(node.nodeValue || ""));
    if (pair) node.nodeValue = pair[language];
  }
}

function translateAttributes() {
  document.querySelectorAll("[aria-label], [title], [placeholder]").forEach((element) => {
    for (const attribute of ["aria-label", "title", "placeholder"]) {
      const value = element.getAttribute(attribute);
      const pair = value && lookup.get(normalise(value));
      if (pair) element.setAttribute(attribute, pair[language]);
    }
  });
  document.querySelectorAll("[aria-label]").forEach((element) => {
    const value = element.getAttribute("aria-label") || "";
    if (language === "pt") {
      if (value === "EstrelaLuaApps home") element.setAttribute("aria-label", "Página inicial da EstrelaLuaApps");
      if (value.startsWith("Open ") && value.endsWith(" details")) element.setAttribute("aria-label", `Abrir detalhes de ${value.slice(5, -8)}`);
    } else {
      if (value === "Página inicial da EstrelaLuaApps") element.setAttribute("aria-label", "EstrelaLuaApps home");
      if (value.startsWith("Abrir detalhes de ")) element.setAttribute("aria-label", `Open ${value.slice(18)} details`);
    }
  });
}

function applyMeta() {
  let path = location.pathname;
  if (path.endsWith("/") || !path.split("/").pop().includes(".")) path += "index.html";
  const rootPath = `/${path.split("/").pop()}`;
  const meta = pageMeta[rootPath];
  if (meta) {
    document.title = meta[language][0];
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta[language][1]);
  }
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
}

function applyLanguage(next) {
  language = saveLanguage(next);
  applyMeta();
  translateTextNodes();
  translateAttributes();
  document.querySelectorAll(".global-language-switch button[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
}

const headerContainer = document.querySelector(".nav-wrap");
if (headerContainer) {
  const backLink = headerContainer.querySelector(".detail-back");
  const holder = document.createElement("div");
  holder.className = "global-language-holder";
  if (backLink) headerContainer.insertBefore(holder, backLink);
  else headerContainer.append(holder);
  createLanguageSwitch({ container: holder, language, onChange: applyLanguage, className: "global-language-switch" });
}

applyLanguage(language);
