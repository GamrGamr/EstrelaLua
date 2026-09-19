import { applyTranslations, createLanguageSwitch, getLanguage, saveLanguage } from "../../assets/i18n-core.js";

const STORAGE_KEY = "training-atlas-library-v1";
const DB_NAME = "training-atlas-media";
const DB_VERSION = 1;
const STORE_NAME = "media";
const MAX_FILE_SIZE = 250 * 1024 * 1024;
const NEW_CHOICE = "__new__";
const DETAIL_KEYS = ["sets","repetitions","weight","distance","duration","rest","intensity","pace","laps","rounds","stroke","equipment","surface","poolLength","drill"];
const MEAL_TYPES = ["breakfast","lunch","dinner","snack","otherMeal"];

const translations = {
  en: {
    description: "Organise sports, workouts, exercises, meals, supplements, personal goals, and a private week-by-day calendar on this device.", skip: "Skip to organiser", home: "EstrelaLuaApps home", nav: "Application navigation", allApps: "All apps", about: "About",
    kicker: "Private training, meal, and supplement library", intro: "Create any sport, organise workouts, meals, and supplements, schedule them together, and follow your personal goals.", localTitle: "Stored only on this device", localCopy: "No account, uploads, analytics, or external requests.",
    libraryTools: "Library tools", storageChecking: "Checking local storage…", export: "Export backup", import: "Import backup", newSport: "New sport", sports: "Sports", noSports: "No sports yet", noSportsCopy: "Start with any discipline—from gym training to swimming, running, or football.", createSport: "Create a sport",
    workouts: "Workouts", newWorkout: "New workout", noWorkouts: "No workouts here", noWorkoutsCopy: "Choose a sport and add its first workout.", createWorkout: "Create a workout", chooseWorkout: "Choose a workout", chooseWorkoutCopy: "Its exercises, instructions, images, and videos will appear here in training order.",
    trainingPlan: "Training plan", edit: "Edit", duplicate: "Duplicate", delete: "Delete", orderHint: "Use the arrows or drag cards to change the order.", addExercise: "Add exercise", noExercises: "No exercises yet", noExercisesCopy: "Add a free-form instruction or use the optional detail fields.", addFirstExercise: "Add first exercise",
    sport: "Sport", close: "Close", name: "Name", descriptionOptional: "Description (optional)", sportNamePlaceholder: "For example, Gym", sportDescriptionPlaceholder: "What do you use this sport for?", cancel: "Cancel", saveSport: "Save sport",
    workout: "Workout", workoutNamePlaceholder: "For example, Push Day", approxDuration: "Approx. duration", durationPlaceholder: "For example, 60 min", notesOptional: "Notes (optional)", saveWorkout: "Save workout",
    exercise: "Exercise", newExercise: "New exercise", exerciseName: "Exercise name", exerciseNamePlaceholder: "For example, freestyle intervals, hill repeats, or bench press", freeDescription: "Free-form description", descriptionPlaceholder: "Write the exercise exactly as you prefer…", optionalDetails: "Optional details", sets: "Sets", repetitions: "Repetitions", weight: "Weight", distance: "Distance", duration: "Duration", rest: "Rest", intensity: "Intensity", instructions: "Instructions", saveExercise: "Save exercise",
    footerPrivacy: "Everything is processed and stored locally in this browser.", legal: "Trademark & copyright", aboutApp: "About the app", createFirstSport: "Create your first sport to begin.", selectSportFirst: "Choose or create a sport first.", selectWorkoutFirst: "Choose or create a workout first.",
    editSport: "Edit sport", deleteSport: "Delete sport", editWorkout: "Edit workout", duplicateWorkout: "Duplicate workout", deleteWorkout: "Delete workout", editExercise: "Edit exercise", duplicateExercise: "Duplicate exercise", deleteExercise: "Delete exercise", moveUp: "Move up", moveDown: "Move down",
    exercises: "exercises", workoutSingular: "workout", workoutPlural: "workouts", sportSingular: "sport", sportPlural: "sports", exerciseSingular: "exercise", exercisePlural: "exercises", approx: "Approx.", notes: "Notes", details: "Details", media: "Images & videos", addMedia: "Add media", replace: "Replace", remove: "Remove",
    confirmDeleteSport: "Move this sport, all its workouts, calendar entries, exercises, images, and videos to Trash?", confirmDeleteWorkout: "Move this workout, its calendar entries, exercises, images, and videos to Trash?", confirmDeleteExercise: "Move this exercise and its images and videos to Trash?", confirmDeleteMedia: "Move this image or video to Trash?", confirmImport: "Importing a backup replaces the current library. Continue?",
    sportSaved: "Sport saved.", workoutSaved: "Workout saved.", exerciseSaved: "Exercise saved.", sportDuplicated: "Workout duplicated.", exerciseDuplicated: "Exercise duplicated.", deleted: "Deleted.", orderUpdated: "Exercise order updated.", mediaSaved: "Media saved locally.", mediaReplaced: "Media replaced.", backupReady: "Backup exported.", importComplete: "Backup imported.",
    unsupportedMedia: "Choose an image or video file.", fileTooLarge: "This file is larger than 250 MB.", storageError: "The browser could not save that file. Free some device storage and try again.", invalidBackup: "This is not a valid Training Atlas backup.", exportError: "The backup could not be created.",
    storageUsed: "used locally", storageUnavailable: "Local storage available", noDescription: "No description", unnamedMedia: "Media", loading: "Loading…", requiredName: "Add a name before saving.", copiedSuffix: "copy", footerLocal: "Local only",
    viewSwitch: "Training Atlas views", library: "Library", calendar: "Calendar", schedule: "Schedule", scheduleWorkout: "Schedule a workout", addWorkout: "Add workout", weeklyPlan: "Weekly plan", monthlyCalendar: "Monthly calendar", selectedDay: "Selected day", today: "Today", previousWeek: "Previous week", nextWeek: "Next week", previousMonth: "Previous month", nextMonth: "Next month", nothingPlanned: "Nothing planned", nothingPlannedCopy: "Add a workout, meal, or supplement to this day.", date: "Date (month/day/year)", sessionNotes: "Session notes (optional)", sessionNotesPlaceholder: "Add anything specific for this day…", saveToCalendar: "Save to calendar", editSchedule: "Edit schedule", markComplete: "Mark complete", markIncomplete: "Mark incomplete", completed: "Completed", openWorkout: "Open workout", removeFromCalendar: "Remove from calendar", sessionSaved: "Workout added to the calendar.", sessionUpdated: "Calendar entry updated.", sessionCompleted: "Workout completed.", sessionReopened: "Workout marked as not completed.", confirmDeleteSession: "Move this calendar session to Trash?", sessionSingular: "planned session", sessionPlural: "planned sessions", noWorkoutsToSchedule: "Create a workout before using the calendar.", weekOf: "Week of",
    addNewWorkoutToCalendar: "Add this workout to the calendar", addNewWorkoutToCalendarCopy: "Optionally schedule its first session now.", firstSessionDate: "First session date (month/day/year)", workoutSavedAndScheduled: "Workout saved and added to the calendar.", trash: "Trash", recoverableItems: "Recoverable items", trashCopy: "Deleted items stay here until you permanently remove them.", emptyTrash: "Empty trash", trashIsEmpty: "Trash is empty", trashIsEmptyCopy: "Deleted sports, workouts, exercises, sessions, meals, supplements, goals, and media will appear here.", trashItemSingular: "item", trashItemPlural: "items", deletedOn: "Deleted", restore: "Recover", permanentlyDelete: "Delete permanently", confirmPermanentDelete: "Permanently delete this item? This cannot be undone.", confirmEmptyTrash: "Permanently delete everything in Trash? This cannot be undone.", restoreWithParents: "This item needs related data that is also deleted. Recover the required items and their contents too?", cannotRestore: "This item cannot be recovered because its required parent data is unavailable.", movedToTrash: "Moved to Trash.", restoredFromTrash: "Recovered from Trash.", permanentlyDeleted: "Permanently deleted.", trashCleared: "Trash emptied.", typeSport: "Sport", typeWorkout: "Workout", typeExercise: "Exercise", typeSession: "Calendar session", typeMedia: "Media",
    planAndSchedule: "Build and schedule", planAndScheduleCopy: "Use something from your library or create the sport, workout, and exercises here.", sportSetup: "Sport setup", chooseOrCreateSport: "Choose a sport or create a new one.", createNewSportOption: "+ Create a new sport", workoutSetup: "Workout setup", chooseOrCreateWorkout: "Choose a workout or create a new one.", createNewWorkoutOption: "+ Create a new workout", exercisesOptional: "Exercises (optional)", exercisesOptionalCopy: "Add any exercises you already know. You can add more later.", addAnotherExercise: "Add another exercise", removeExercise: "Remove exercise", calendarDetailsCopy: "Choose the day and add any session-specific notes.", savePlanToCalendar: "Save plan to calendar", planSaved: "Workout plan saved to the calendar.", scheduleAnotherWorkout: "Schedule another workout", confirmDeleteOwnedPlan: "This calendar entry created a new library plan. Remove it from the calendar and move its workout, exercises, and any otherwise-empty new sport to Trash?",
    goals: "Goals", goal: "Goal", personalMilestones: "Personal milestones", goalsIntro: "Create a target and watch each circle fill as you complete workouts. You can also adjust progress manually.", newGoal: "New goal", createGoal: "Create a goal", noGoals: "No goals yet", noGoalsCopy: "Choose a personal target, such as completing 10 workouts, and build your streak one circle at a time.", goalDialogCopy: "Every completed calendar workout fills one circle. Click the circles whenever you want to adjust the count yourself.", goalName: "Goal name", goalNamePlaceholder: "For example, Complete 10 workouts", targetWorkouts: "Number of circles", saveGoal: "Save goal", editGoal: "Edit goal", deleteGoal: "Delete goal", confirmDeleteGoal: "Move this goal and its progress to Trash?", goalSaved: "Goal saved.", goalProgressUpdated: "Goal progress updated.", goalComplete: "Goal complete!", goalProgressHint: "Completed workouts fill circles automatically. Click a filled circle to remove one, or an empty circle to set that total.", goalSingular: "goal", goalPlural: "goals", typeGoal: "Goal",
    flexibleDetails: "Flexible details", flexibleDetailsCopy: "Add only what matters for this activity—pace, stroke, distance, court, rounds, equipment, or anything else.", addDetail: "Add detail", removeDetail: "Remove detail", detailLabel: "Detail", detailValue: "Value", detailLabelPlaceholder: "For example, Pace", detailValuePlaceholder: "For example, 5:00/km", pace: "Pace", laps: "Laps", rounds: "Rounds", stroke: "Stroke / style", equipment: "Equipment", surface: "Surface / court", poolLength: "Pool length", drill: "Drill",
    meals: "Meals", meal: "Meal", mealPlanning: "Meal planning", mealsIntro: "Build a private meal library and place breakfast, lunch, dinner, snacks, or any custom meal on your training calendar.", newMeal: "New meal", createMeal: "Create a meal", noMeals: "No meals yet", noMealsCopy: "Save a meal once, then add it to any day in the calendar.", mealName: "Meal name", mealNamePlaceholder: "For example, Oats with fruit", mealType: "Meal type", breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", otherMeal: "Other", foodsIngredients: "Foods / ingredients", foodsIngredientsPlaceholder: "Write the foods, quantities, or meal exactly as you prefer…", preparationOptional: "Preparation (optional)", saveMeal: "Save meal", scheduleMeal: "Schedule a meal", editMeal: "Edit meal", duplicateMeal: "Duplicate meal", deleteMeal: "Delete meal", mealSaved: "Meal saved.", mealSavedAndScheduled: "Meal saved and added to the calendar.", mealScheduled: "Meal added to the calendar.", mealScheduleUpdated: "Meal calendar entry updated.", mealCompleted: "Meal marked as eaten.", mealReopened: "Meal marked as not eaten.", markMealComplete: "Mark as eaten", markMealIncomplete: "Mark as not eaten", eaten: "Eaten", openMeal: "Open meal", editMealSchedule: "Edit meal date", removeMealFromCalendar: "Remove meal from calendar", confirmDeleteMeal: "Move this meal and its calendar entries to Trash?", confirmDeleteMealEntry: "Move this planned meal to Trash?", noMealsToSchedule: "Create a meal before adding one to the calendar.", addNewMealToCalendar: "Add this meal to the calendar", addNewMealToCalendarCopy: "Optionally plan its first date now.", firstMealDate: "First meal date (month/day/year)", mealNotes: "Meal notes (optional)", mealNotesPlaceholder: "Add anything specific for this day…", scheduleAnotherMeal: "Schedule another meal", mealSingular: "meal", mealPlural: "meals", mealEntrySingular: "planned meal", mealEntryPlural: "planned meals", calendarItemSingular: "planned item", calendarItemPlural: "planned items", typeMeal: "Meal", typeMealEntry: "Calendar meal",
    supplements: "Supplements", supplement: "Supplement", supplementPlanning: "Supplement planning", supplementsIntro: "Build a private supplement library with amounts, timing, and instructions, then add each item to the shared calendar.", newSupplement: "New supplement", createSupplement: "Create a supplement", noSupplements: "No supplements yet", noSupplementsCopy: "Save a supplement once, then add it to any day in the calendar.", supplementName: "Supplement name", supplementNamePlaceholder: "For example, Creatine", amountOptional: "Amount (optional)", amountPlaceholder: "For example, 5 g", timingOptional: "Timing (optional)", timingPlaceholder: "For example, With breakfast", supplementInstructionsOptional: "Instructions (optional)", supplementInstructionsPlaceholder: "Add frequency, method, or other useful directions…", saveSupplement: "Save supplement", scheduleSupplement: "Schedule a supplement", editSupplement: "Edit supplement", duplicateSupplement: "Duplicate supplement", deleteSupplement: "Delete supplement", supplementSaved: "Supplement saved.", supplementSavedAndScheduled: "Supplement saved and added to the calendar.", supplementScheduled: "Supplement added to the calendar.", supplementScheduleUpdated: "Supplement calendar entry updated.", supplementCompleted: "Supplement marked as taken.", supplementReopened: "Supplement marked as not taken.", markSupplementComplete: "Mark as taken", markSupplementIncomplete: "Mark as not taken", taken: "Taken", openSupplement: "Open supplement", editSupplementSchedule: "Edit supplement date", removeSupplementFromCalendar: "Remove supplement from calendar", confirmDeleteSupplement: "Move this supplement and its calendar entries to Trash?", confirmDeleteSupplementEntry: "Move this planned supplement to Trash?", noSupplementsToSchedule: "Create a supplement before adding one to the calendar.", addNewSupplementToCalendar: "Add this supplement to the calendar", addNewSupplementToCalendarCopy: "Optionally plan its first date now.", firstSupplementDate: "First supplement date (month/day/year)", supplementNotes: "Supplement notes (optional)", supplementNotesPlaceholder: "Add anything specific for this day…", scheduleAnotherSupplement: "Schedule another supplement", supplementSingular: "supplement", supplementPlural: "supplements", supplementEntrySingular: "planned supplement", supplementEntryPlural: "planned supplements", typeSupplement: "Supplement", typeSupplementEntry: "Calendar supplement"
  },
  pt: {
    description: "Organize desportos, treinos, exercícios, refeições, suplementos, objetivos pessoais e um calendário privado por semana e dia neste dispositivo.", skip: "Saltar para o organizador", home: "Página inicial da EstrelaLuaApps", nav: "Navegação da aplicação", allApps: "Todas as apps", about: "Sobre",
    kicker: "Biblioteca privada de treinos, refeições e suplementos", intro: "Crie qualquer desporto, organize treinos, refeições e suplementos, agende-os em conjunto e acompanhe os seus objetivos pessoais.", localTitle: "Guardado apenas neste dispositivo", localCopy: "Sem conta, envios, análises ou pedidos externos.",
    libraryTools: "Ferramentas da biblioteca", storageChecking: "A verificar armazenamento local…", export: "Exportar cópia", import: "Importar cópia", newSport: "Novo desporto", sports: "Desportos", noSports: "Ainda não existem desportos", noSportsCopy: "Comece por qualquer modalidade — ginásio, natação, corrida ou futebol.", createSport: "Criar desporto",
    workouts: "Treinos", newWorkout: "Novo treino", noWorkouts: "Ainda não existem treinos", noWorkoutsCopy: "Escolha um desporto e adicione o primeiro treino.", createWorkout: "Criar treino", chooseWorkout: "Escolha um treino", chooseWorkoutCopy: "Os exercícios, instruções, imagens e vídeos aparecem aqui pela ordem de execução.",
    trainingPlan: "Plano de treino", edit: "Editar", duplicate: "Duplicar", delete: "Eliminar", orderHint: "Use as setas ou arraste os cartões para alterar a ordem.", addExercise: "Adicionar exercício", noExercises: "Ainda não existem exercícios", noExercisesCopy: "Adicione uma descrição livre ou utilize os campos opcionais.", addFirstExercise: "Adicionar primeiro exercício",
    sport: "Desporto", close: "Fechar", name: "Nome", descriptionOptional: "Descrição (opcional)", sportNamePlaceholder: "Por exemplo, Ginásio", sportDescriptionPlaceholder: "Como utiliza este desporto?", cancel: "Cancelar", saveSport: "Guardar desporto",
    workout: "Treino", workoutNamePlaceholder: "Por exemplo, Push Day", approxDuration: "Duração aproximada", durationPlaceholder: "Por exemplo, 60 min", notesOptional: "Notas (opcional)", saveWorkout: "Guardar treino",
    exercise: "Exercício", newExercise: "Novo exercício", exerciseName: "Nome do exercício", exerciseNamePlaceholder: "Por exemplo, séries de crawl, subidas ou supino", freeDescription: "Descrição livre", descriptionPlaceholder: "Escreva o exercício exatamente como preferir…", optionalDetails: "Detalhes opcionais", sets: "Séries", repetitions: "Repetições", weight: "Peso", distance: "Distância", duration: "Duração", rest: "Descanso", intensity: "Intensidade", instructions: "Instruções", saveExercise: "Guardar exercício",
    footerPrivacy: "Tudo é processado e guardado localmente neste navegador.", legal: "Marcas e direitos de autor", aboutApp: "Sobre a app", createFirstSport: "Crie o primeiro desporto para começar.", selectSportFirst: "Escolha ou crie primeiro um desporto.", selectWorkoutFirst: "Escolha ou crie primeiro um treino.",
    editSport: "Editar desporto", deleteSport: "Eliminar desporto", editWorkout: "Editar treino", duplicateWorkout: "Duplicar treino", deleteWorkout: "Eliminar treino", editExercise: "Editar exercício", duplicateExercise: "Duplicar exercício", deleteExercise: "Eliminar exercício", moveUp: "Mover para cima", moveDown: "Mover para baixo",
    exercises: "exercícios", workoutSingular: "treino", workoutPlural: "treinos", sportSingular: "desporto", sportPlural: "desportos", exerciseSingular: "exercício", exercisePlural: "exercícios", approx: "Aprox.", notes: "Notas", details: "Detalhes", media: "Imagens e vídeos", addMedia: "Adicionar multimédia", replace: "Substituir", remove: "Remover",
    confirmDeleteSport: "Mover este desporto e todos os treinos, agendamentos, exercícios, imagens e vídeos para o Lixo?", confirmDeleteWorkout: "Mover este treino, os agendamentos, exercícios, imagens e vídeos para o Lixo?", confirmDeleteExercise: "Mover este exercício e as respetivas imagens e vídeos para o Lixo?", confirmDeleteMedia: "Mover esta imagem ou vídeo para o Lixo?", confirmImport: "Importar uma cópia substitui a biblioteca atual. Continuar?",
    sportSaved: "Desporto guardado.", workoutSaved: "Treino guardado.", exerciseSaved: "Exercício guardado.", sportDuplicated: "Treino duplicado.", exerciseDuplicated: "Exercício duplicado.", deleted: "Eliminado.", orderUpdated: "Ordem dos exercícios atualizada.", mediaSaved: "Multimédia guardada localmente.", mediaReplaced: "Multimédia substituída.", backupReady: "Cópia exportada.", importComplete: "Cópia importada.",
    unsupportedMedia: "Escolha um ficheiro de imagem ou vídeo.", fileTooLarge: "Este ficheiro tem mais de 250 MB.", storageError: "O navegador não conseguiu guardar o ficheiro. Liberte espaço no dispositivo e tente novamente.", invalidBackup: "Esta não é uma cópia válida do Training Atlas.", exportError: "Não foi possível criar a cópia.",
    storageUsed: "utilizados localmente", storageUnavailable: "Armazenamento local disponível", noDescription: "Sem descrição", unnamedMedia: "Multimédia", loading: "A carregar…", requiredName: "Adicione um nome antes de guardar.", copiedSuffix: "cópia", footerLocal: "Apenas local",
    viewSwitch: "Vistas do Training Atlas", library: "Biblioteca", calendar: "Calendário", schedule: "Agendar", scheduleWorkout: "Agendar um treino", addWorkout: "Adicionar treino", weeklyPlan: "Plano semanal", monthlyCalendar: "Calendário mensal", selectedDay: "Dia selecionado", today: "Hoje", previousWeek: "Semana anterior", nextWeek: "Semana seguinte", previousMonth: "Mês anterior", nextMonth: "Mês seguinte", nothingPlanned: "Nada planeado", nothingPlannedCopy: "Adicione um treino, uma refeição ou um suplemento a este dia.", date: "Data (mês/dia/ano)", sessionNotes: "Notas da sessão (opcional)", sessionNotesPlaceholder: "Adicione algo específico para este dia…", saveToCalendar: "Guardar no calendário", editSchedule: "Editar agendamento", markComplete: "Marcar como concluído", markIncomplete: "Marcar como não concluído", completed: "Concluído", openWorkout: "Abrir treino", removeFromCalendar: "Remover do calendário", sessionSaved: "Treino adicionado ao calendário.", sessionUpdated: "Agendamento atualizado.", sessionCompleted: "Treino concluído.", sessionReopened: "Treino marcado como não concluído.", confirmDeleteSession: "Mover esta sessão do calendário para o Lixo?", sessionSingular: "sessão planeada", sessionPlural: "sessões planeadas", noWorkoutsToSchedule: "Crie um treino antes de utilizar o calendário.", weekOf: "Semana de",
    addNewWorkoutToCalendar: "Adicionar este treino ao calendário", addNewWorkoutToCalendarCopy: "Agende já a primeira sessão, se quiser.", firstSessionDate: "Data da primeira sessão (mês/dia/ano)", workoutSavedAndScheduled: "Treino guardado e adicionado ao calendário.", trash: "Lixo", recoverableItems: "Itens recuperáveis", trashCopy: "Os itens eliminados permanecem aqui até serem removidos permanentemente.", emptyTrash: "Esvaziar lixo", trashIsEmpty: "O lixo está vazio", trashIsEmptyCopy: "Os desportos, treinos, exercícios, sessões, refeições, suplementos, objetivos e ficheiros eliminados aparecem aqui.", trashItemSingular: "item", trashItemPlural: "itens", deletedOn: "Eliminado", restore: "Recuperar", permanentlyDelete: "Eliminar permanentemente", confirmPermanentDelete: "Eliminar este item permanentemente? Esta ação não pode ser anulada.", confirmEmptyTrash: "Eliminar permanentemente tudo o que está no Lixo? Esta ação não pode ser anulada.", restoreWithParents: "Este item precisa de dados relacionados que também foram eliminados. Recuperar os itens necessários e o respetivo conteúdo?", cannotRestore: "Não é possível recuperar este item porque faltam os dados do elemento-pai necessário.", movedToTrash: "Movido para o Lixo.", restoredFromTrash: "Recuperado do Lixo.", permanentlyDeleted: "Eliminado permanentemente.", trashCleared: "Lixo esvaziado.", typeSport: "Desporto", typeWorkout: "Treino", typeExercise: "Exercício", typeSession: "Sessão do calendário", typeMedia: "Multimédia",
    planAndSchedule: "Criar e agendar", planAndScheduleCopy: "Utilize algo da sua biblioteca ou crie aqui o desporto, o treino e os exercícios.", sportSetup: "Configuração do desporto", chooseOrCreateSport: "Escolha um desporto ou crie um novo.", createNewSportOption: "+ Criar novo desporto", workoutSetup: "Configuração do treino", chooseOrCreateWorkout: "Escolha um treino ou crie um novo.", createNewWorkoutOption: "+ Criar novo treino", exercisesOptional: "Exercícios (opcional)", exercisesOptionalCopy: "Adicione os exercícios que já conhece. Pode acrescentar mais tarde.", addAnotherExercise: "Adicionar outro exercício", removeExercise: "Remover exercício", calendarDetailsCopy: "Escolha o dia e adicione notas específicas desta sessão.", savePlanToCalendar: "Guardar plano no calendário", planSaved: "Plano de treino guardado no calendário.", scheduleAnotherWorkout: "Agendar outro treino", confirmDeleteOwnedPlan: "Este agendamento criou um plano novo na Biblioteca. Removê-lo do calendário e mover o treino, os exercícios e qualquer desporto novo que fique vazio para o Lixo?",
    goals: "Objetivos", goal: "Objetivo", personalMilestones: "Metas pessoais", goalsIntro: "Crie uma meta e veja cada círculo ficar preenchido à medida que conclui treinos. Também pode ajustar o progresso manualmente.", newGoal: "Novo objetivo", createGoal: "Criar objetivo", noGoals: "Ainda não existem objetivos", noGoalsCopy: "Escolha uma meta pessoal, como concluir 10 treinos, e avance um círculo de cada vez.", goalDialogCopy: "Cada treino concluído no calendário preenche um círculo. Clique nos círculos sempre que quiser ajustar a contagem manualmente.", goalName: "Nome do objetivo", goalNamePlaceholder: "Por exemplo, Concluir 10 treinos", targetWorkouts: "Número de círculos", saveGoal: "Guardar objetivo", editGoal: "Editar objetivo", deleteGoal: "Eliminar objetivo", confirmDeleteGoal: "Mover este objetivo e o respetivo progresso para o Lixo?", goalSaved: "Objetivo guardado.", goalProgressUpdated: "Progresso do objetivo atualizado.", goalComplete: "Objetivo concluído!", goalProgressHint: "Os treinos concluídos preenchem círculos automaticamente. Clique num círculo preenchido para retirar um, ou num vazio para definir esse total.", goalSingular: "objetivo", goalPlural: "objetivos", typeGoal: "Objetivo",
    flexibleDetails: "Detalhes flexíveis", flexibleDetailsCopy: "Adicione apenas o que interessa para esta atividade — ritmo, estilo, distância, campo, rondas, equipamento ou qualquer outro detalhe.", addDetail: "Adicionar detalhe", removeDetail: "Remover detalhe", detailLabel: "Detalhe", detailValue: "Valor", detailLabelPlaceholder: "Por exemplo, Ritmo", detailValuePlaceholder: "Por exemplo, 5:00/km", pace: "Ritmo", laps: "Voltas", rounds: "Rondas", stroke: "Estilo / técnica", equipment: "Equipamento", surface: "Superfície / campo", poolLength: "Comprimento da piscina", drill: "Exercício técnico",
    meals: "Refeições", meal: "Refeição", mealPlanning: "Planeamento de refeições", mealsIntro: "Crie uma biblioteca privada de refeições e coloque o pequeno-almoço, almoço, jantar, lanches ou qualquer refeição personalizada no calendário de treinos.", newMeal: "Nova refeição", createMeal: "Criar refeição", noMeals: "Ainda não existem refeições", noMealsCopy: "Guarde uma refeição uma vez e adicione-a a qualquer dia do calendário.", mealName: "Nome da refeição", mealNamePlaceholder: "Por exemplo, Papas de aveia com fruta", mealType: "Tipo de refeição", breakfast: "Pequeno-almoço", lunch: "Almoço", dinner: "Jantar", snack: "Lanche", otherMeal: "Outra", foodsIngredients: "Alimentos / ingredientes", foodsIngredientsPlaceholder: "Escreva os alimentos, quantidades ou a refeição exatamente como preferir…", preparationOptional: "Preparação (opcional)", saveMeal: "Guardar refeição", scheduleMeal: "Agendar refeição", editMeal: "Editar refeição", duplicateMeal: "Duplicar refeição", deleteMeal: "Eliminar refeição", mealSaved: "Refeição guardada.", mealSavedAndScheduled: "Refeição guardada e adicionada ao calendário.", mealScheduled: "Refeição adicionada ao calendário.", mealScheduleUpdated: "Agendamento da refeição atualizado.", mealCompleted: "Refeição marcada como consumida.", mealReopened: "Refeição marcada como não consumida.", markMealComplete: "Marcar como consumida", markMealIncomplete: "Marcar como não consumida", eaten: "Consumida", openMeal: "Abrir refeição", editMealSchedule: "Editar data da refeição", removeMealFromCalendar: "Remover refeição do calendário", confirmDeleteMeal: "Mover esta refeição e os respetivos agendamentos para o Lixo?", confirmDeleteMealEntry: "Mover esta refeição planeada para o Lixo?", noMealsToSchedule: "Crie uma refeição antes de a adicionar ao calendário.", addNewMealToCalendar: "Adicionar esta refeição ao calendário", addNewMealToCalendarCopy: "Planeie já a primeira data, se quiser.", firstMealDate: "Data da primeira refeição (mês/dia/ano)", mealNotes: "Notas da refeição (opcional)", mealNotesPlaceholder: "Adicione algo específico para este dia…", scheduleAnotherMeal: "Agendar outra refeição", mealSingular: "refeição", mealPlural: "refeições", mealEntrySingular: "refeição planeada", mealEntryPlural: "refeições planeadas", calendarItemSingular: "item planeado", calendarItemPlural: "itens planeados", typeMeal: "Refeição", typeMealEntry: "Refeição do calendário",
    supplements: "Suplementos", supplement: "Suplemento", supplementPlanning: "Planeamento de suplementos", supplementsIntro: "Crie uma biblioteca privada de suplementos com quantidades, horários e instruções e adicione cada item ao calendário partilhado.", newSupplement: "Novo suplemento", createSupplement: "Criar suplemento", noSupplements: "Ainda não existem suplementos", noSupplementsCopy: "Guarde um suplemento uma vez e adicione-o a qualquer dia do calendário.", supplementName: "Nome do suplemento", supplementNamePlaceholder: "Por exemplo, Creatina", amountOptional: "Quantidade (opcional)", amountPlaceholder: "Por exemplo, 5 g", timingOptional: "Horário (opcional)", timingPlaceholder: "Por exemplo, Ao pequeno-almoço", supplementInstructionsOptional: "Instruções (opcional)", supplementInstructionsPlaceholder: "Adicione a frequência, o modo de utilização ou outras indicações úteis…", saveSupplement: "Guardar suplemento", scheduleSupplement: "Agendar suplemento", editSupplement: "Editar suplemento", duplicateSupplement: "Duplicar suplemento", deleteSupplement: "Eliminar suplemento", supplementSaved: "Suplemento guardado.", supplementSavedAndScheduled: "Suplemento guardado e adicionado ao calendário.", supplementScheduled: "Suplemento adicionado ao calendário.", supplementScheduleUpdated: "Agendamento do suplemento atualizado.", supplementCompleted: "Suplemento marcado como tomado.", supplementReopened: "Suplemento marcado como não tomado.", markSupplementComplete: "Marcar como tomado", markSupplementIncomplete: "Marcar como não tomado", taken: "Tomado", openSupplement: "Abrir suplemento", editSupplementSchedule: "Editar data do suplemento", removeSupplementFromCalendar: "Remover suplemento do calendário", confirmDeleteSupplement: "Mover este suplemento e os respetivos agendamentos para o Lixo?", confirmDeleteSupplementEntry: "Mover este suplemento planeado para o Lixo?", noSupplementsToSchedule: "Crie um suplemento antes de o adicionar ao calendário.", addNewSupplementToCalendar: "Adicionar este suplemento ao calendário", addNewSupplementToCalendarCopy: "Planeie já a primeira data, se quiser.", firstSupplementDate: "Data do primeiro suplemento (mês/dia/ano)", supplementNotes: "Notas do suplemento (opcional)", supplementNotesPlaceholder: "Adicione algo específico para este dia…", scheduleAnotherSupplement: "Agendar outro suplemento", supplementSingular: "suplemento", supplementPlural: "suplementos", supplementEntrySingular: "suplemento planeado", supplementEntryPlural: "suplementos planeados", typeSupplement: "Suplemento", typeSupplementEntry: "Suplemento do calendário"
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const now = () => new Date().toISOString();
const id = () => globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
const clean = (value, max = 2000) => String(value ?? "").trim().slice(0, max);
const cloneData = (value) => JSON.parse(JSON.stringify(value));
const emptyState = () => ({ version: 6, sports: [], workouts: [], exercises: [], sessions: [], meals: [], mealEntries: [], supplements: [], supplementEntries: [], goals: [], trash: [] });

let language = getLanguage();
let state = loadState();
let selectedSportId = state.sports[0]?.id || null;
let selectedWorkoutId = state.workouts.find((item) => item.sportId === selectedSportId)?.id || null;
let activeView = "library";
let selectedDate = toLocalIso(new Date());
let calendarMonth = startOfMonth(parseIsoDate(selectedDate));
let toastTimer;
let mediaTarget = null;
let draggedExerciseId = null;
let planRenderToken = 0;
const objectUrls = new Set();

const elements = {
  sportsList: $("#sports-list"), sportsEmpty: $("#sports-empty"), workoutsList: $("#workouts-list"), workoutsEmpty: $("#workouts-empty"), activeSportName: $("#active-sport-name"),
  planEmpty: $("#plan-empty"), planView: $("#plan-view"), planTitle: $("#plan-title"), planDescription: $("#plan-description"), planMeta: $("#plan-meta"), workoutNotes: $("#workout-notes"), exerciseCount: $("#exercise-count"), exerciseList: $("#exercise-list"), exercisesEmpty: $("#exercises-empty"),
  sportDialog: $("#sport-dialog"), sportForm: $("#sport-form"), sportDialogTitle: $("#sport-dialog-title"), workoutDialog: $("#workout-dialog"), workoutForm: $("#workout-form"), workoutDialogTitle: $("#workout-dialog-title"), workoutSchedule: $("#new-workout-schedule"), workoutDate: $("#new-workout-date"), exerciseDialog: $("#exercise-dialog"), exerciseForm: $("#exercise-form"), exerciseDialogTitle: $("#exercise-dialog-title"), exerciseDetails: $("#exercise-details"), customDetailTemplate: $("#custom-detail-template"), detailLabelOptions: $("#detail-label-options"), scheduleDialog: $("#schedule-dialog"), scheduleForm: $("#schedule-form"), scheduleDialogTitle: $("#schedule-dialog-title"), mealDialog: $("#meal-dialog"), mealForm: $("#meal-form"), mealDialogTitle: $("#meal-dialog-title"), mealSchedule: $("#new-meal-schedule"), mealDate: $("#new-meal-date"), mealScheduleDialog: $("#meal-schedule-dialog"), mealScheduleForm: $("#meal-schedule-form"), mealScheduleDialogTitle: $("#meal-schedule-dialog-title"), supplementDialog: $("#supplement-dialog"), supplementForm: $("#supplement-form"), supplementDialogTitle: $("#supplement-dialog-title"), supplementSchedule: $("#new-supplement-schedule"), supplementDate: $("#new-supplement-date"), supplementScheduleDialog: $("#supplement-schedule-dialog"), supplementScheduleForm: $("#supplement-schedule-form"), supplementScheduleDialogTitle: $("#supplement-schedule-dialog-title"), plannerDialog: $("#planner-dialog"), plannerForm: $("#planner-form"), plannerNewSport: $("#planner-new-sport"), plannerNewWorkout: $("#planner-new-workout"), plannerExercises: $("#planner-exercises"), plannerExerciseTemplate: $("#planner-exercise-template"), goalDialog: $("#goal-dialog"), goalForm: $("#goal-form"), goalDialogTitle: $("#goal-dialog-title"), trashDialog: $("#trash-dialog"), trashList: $("#trash-list"), trashEmpty: $("#trash-empty"), trashCount: $("#trash-count"), trashSummary: $("#trash-summary"), emptyTrash: $("#empty-trash"),
  libraryView: $("#library-view"), calendarView: $("#calendar-view"), mealsView: $("#meals-view"), mealsList: $("#meals-list"), mealsEmpty: $("#meals-empty"), supplementsView: $("#supplements-view"), supplementsList: $("#supplements-list"), supplementsEmpty: $("#supplements-empty"), goalsView: $("#goals-view"), goalsList: $("#goals-list"), goalsEmpty: $("#goals-empty"), weekTitle: $("#week-title"), weekDays: $("#week-days"), monthTitle: $("#month-title"), calendarWeekdays: $("#calendar-weekdays"), calendarGrid: $("#calendar-grid"), agendaTitle: $("#agenda-title"), agendaList: $("#agenda-list"), agendaEmpty: $("#agenda-empty"),
  mediaInput: $("#media-input"), toast: $("#toast"), summary: $("#summary-counts"), storage: $("#storage-status"), importInput: $("#import-backup")
};

function t(key) { return translations[language]?.[key] ?? translations.en[key] ?? key; }

function toLocalIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year || 2000, (month || 1) - 1, day || 1, 12);
}

function addDays(date, amount) { const next = new Date(date); next.setDate(next.getDate() + amount); return next; }
function startOfMonth(date) { return new Date(date.getFullYear(), date.getMonth(), 1, 12); }
function startOfWeek(date) { const next = new Date(date); const day = (next.getDay() + 6) % 7; next.setDate(next.getDate() - day); return next; }
function dateLocale() { return language === "pt" ? "pt-PT" : "en-GB"; }
function formatDate(date, options) { return new Intl.DateTimeFormat(dateLocale(), options).format(date); }
function capitalise(value) { return value ? value[0].toLocaleUpperCase(dateLocale()) + value.slice(1) : value; }
function sessionsForDate(date) { return state.sessions.filter((session) => session.date === date).sort((a,b) => a.createdAt.localeCompare(b.createdAt)); }
function mealEntriesForDate(date) { return state.mealEntries.filter((entry) => entry.date === date).sort((a,b) => a.createdAt.localeCompare(b.createdAt)); }
function supplementEntriesForDate(date) { return state.supplementEntries.filter((entry) => entry.date === date).sort((a,b) => a.createdAt.localeCompare(b.createdAt)); }
function calendarItemsForDate(date) {
  return [...sessionsForDate(date).map((item) => ({ kind: "workout", item })), ...mealEntriesForDate(date).map((item) => ({ kind: "meal", item })), ...supplementEntriesForDate(date).map((item) => ({ kind: "supplement", item }))]
    .sort((a,b) => a.item.createdAt.localeCompare(b.item.createdAt));
}

function loadState() {
  try { return normaliseState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { return emptyState(); }
}

function sanitiseSport(item) { return { id: clean(item?.id,100) || id(), name: clean(item?.name,60), description: clean(item?.description,300), createdAt: item?.createdAt || now() }; }
function sanitiseWorkout(item) { return { id: clean(item?.id,100) || id(), sportId: clean(item?.sportId,100), name: clean(item?.name,80), description: clean(item?.description,500), duration: clean(item?.duration,40), notes: clean(item?.notes,200), createdAt: item?.createdAt || now() }; }
function sanitiseMedia(item) { return { id: clean(item?.id,100), name: clean(item?.name,240), type: clean(item?.type,100), size: Number(item?.size) || 0 }; }
function sanitiseDetail(item) {
  const key = DETAIL_KEYS.includes(item?.key) ? item.key : "";
  const label = key ? "" : clean(item?.label,60);
  const value = clean(item?.value,120);
  return value && (key || label) ? { id: clean(item?.id,100) || id(), key, label, value } : null;
}
function legacyExerciseDetails(item) {
  return [["sets","sets"],["repetitions","reps"],["weight","weight"],["distance","distance"],["duration","duration"],["rest","rest"],["intensity","intensity"]]
    .map(([key,property]) => sanitiseDetail({ key, value: item?.[property] })).filter(Boolean);
}
function sanitiseExercise(item) {
  const details = Array.isArray(item?.details) ? item.details.slice(0,50).map(sanitiseDetail).filter(Boolean) : legacyExerciseDetails(item);
  return {
    id: clean(item?.id,100) || id(), workoutId: clean(item?.workoutId,100), name: clean(item?.name,100), description: clean(item?.description,1000), sets: clean(item?.sets,30), reps: clean(item?.reps,40), weight: clean(item?.weight,40), distance: clean(item?.distance,40), duration: clean(item?.duration,40), rest: clean(item?.rest,40), intensity: clean(item?.intensity,80), details, instructions: clean(item?.instructions,1500), notes: clean(item?.notes,800), order: Number.isFinite(Number(item?.order)) ? Number(item.order) : 0,
    media: Array.isArray(item?.media) ? item.media.map(sanitiseMedia).filter((media) => media.id) : [], createdAt: item?.createdAt || now()
  };
}
function sanitiseSession(item) { return { id: clean(item?.id,100) || id(), sportId: clean(item?.sportId,100), workoutId: clean(item?.workoutId,100), date: /^\d{4}-\d{2}-\d{2}$/.test(clean(item?.date,10)) ? clean(item.date,10) : "", notes: clean(item?.notes,500), completed: Boolean(item?.completed), plannerCreatedWorkout: Boolean(item?.plannerCreatedWorkout), plannerCreatedSport: Boolean(item?.plannerCreatedSport), createdAt: item?.createdAt || now() }; }
function sanitiseMeal(item) { return { id: clean(item?.id,100) || id(), name: clean(item?.name,100), type: MEAL_TYPES.includes(item?.type) ? item.type : "otherMeal", description: clean(item?.description,1200), instructions: clean(item?.instructions,1200), notes: clean(item?.notes,500), createdAt: item?.createdAt || now() }; }
function sanitiseMealEntry(item) { return { id: clean(item?.id,100) || id(), mealId: clean(item?.mealId,100), date: /^\d{4}-\d{2}-\d{2}$/.test(clean(item?.date,10)) ? clean(item.date,10) : "", notes: clean(item?.notes,500), completed: Boolean(item?.completed), createdAt: item?.createdAt || now() }; }
function sanitiseSupplement(item) { return { id: clean(item?.id,100) || id(), name: clean(item?.name,100), amount: clean(item?.amount,80), timing: clean(item?.timing,120), instructions: clean(item?.instructions,1200), notes: clean(item?.notes,500), createdAt: item?.createdAt || now() }; }
function sanitiseSupplementEntry(item) { return { id: clean(item?.id,100) || id(), supplementId: clean(item?.supplementId,100), date: /^\d{4}-\d{2}-\d{2}$/.test(clean(item?.date,10)) ? clean(item.date,10) : "", notes: clean(item?.notes,500), completed: Boolean(item?.completed), createdAt: item?.createdAt || now() }; }
function sanitiseGoal(item) {
  const target = Math.max(1,Math.min(365,Math.round(Number(item?.target) || 10)));
  const completedSessionIds = [...new Set(Array.isArray(item?.completedSessionIds) ? item.completedSessionIds.map((value) => clean(value,100)).filter(Boolean) : [])];
  const manualProgress = Math.max(0,Math.min(target,Math.round(Number(item?.manualProgress) || 0)));
  return { id: clean(item?.id,100) || id(), name: clean(item?.name,80), target, manualProgress, completedSessionIds, createdAt: item?.createdAt || now() };
}

function sanitiseTrashItem(item) {
  const type = ["sport","workout","exercise","session","meal","mealEntry","supplement","supplementEntry","media","goal"].includes(item?.type) ? item.type : "";
  if (!type || !item?.payload || typeof item.payload !== "object") return null;
  const payload = {};
  if (item.payload.sport) payload.sport = sanitiseSport(item.payload.sport);
  if (item.payload.workout) payload.workout = sanitiseWorkout(item.payload.workout);
  if (item.payload.exercise) payload.exercise = sanitiseExercise(item.payload.exercise);
  if (item.payload.session) payload.session = sanitiseSession(item.payload.session);
  if (item.payload.meal) payload.meal = sanitiseMeal(item.payload.meal);
  if (item.payload.mealEntry) payload.mealEntry = sanitiseMealEntry(item.payload.mealEntry);
  if (item.payload.supplement) payload.supplement = sanitiseSupplement(item.payload.supplement);
  if (item.payload.supplementEntry) payload.supplementEntry = sanitiseSupplementEntry(item.payload.supplementEntry);
  if (item.payload.media) payload.media = sanitiseMedia(item.payload.media);
  if (item.payload.goal) payload.goal = sanitiseGoal(item.payload.goal);
  payload.workouts = Array.isArray(item.payload.workouts) ? item.payload.workouts.map(sanitiseWorkout).filter((value) => value.name) : [];
  payload.exercises = Array.isArray(item.payload.exercises) ? item.payload.exercises.map(sanitiseExercise).filter((value) => value.name) : [];
  payload.sessions = Array.isArray(item.payload.sessions) ? item.payload.sessions.map(sanitiseSession).filter((value) => value.date) : [];
  payload.mealEntries = Array.isArray(item.payload.mealEntries) ? item.payload.mealEntries.map(sanitiseMealEntry).filter((value) => value.date) : [];
  payload.supplementEntries = Array.isArray(item.payload.supplementEntries) ? item.payload.supplementEntries.map(sanitiseSupplementEntry).filter((value) => value.date) : [];
  return { id: clean(item.id,100) || id(), type, label: clean(item.label,120) || type, deletedAt: item.deletedAt || now(), payload };
}

function normaliseState(input) {
  if (!input || typeof input !== "object") return emptyState();
  const sports = Array.isArray(input.sports) ? input.sports.map(sanitiseSport).filter((item) => item.name) : [];
  const sportIds = new Set(sports.map((item) => item.id));
  const workouts = Array.isArray(input.workouts) ? input.workouts.map(sanitiseWorkout).filter((item) => item.name && sportIds.has(item.sportId)) : [];
  const workoutIds = new Set(workouts.map((item) => item.id));
  const exercises = Array.isArray(input.exercises) ? input.exercises.map(sanitiseExercise).filter((item) => item.name && workoutIds.has(item.workoutId)) : [];
  const sessions = Array.isArray(input.sessions) ? input.sessions.map(sanitiseSession).filter((item) => item.date && sportIds.has(item.sportId) && workoutIds.has(item.workoutId) && workouts.some((workout) => workout.id === item.workoutId && workout.sportId === item.sportId)) : [];
  const meals = Array.isArray(input.meals) ? input.meals.map(sanitiseMeal).filter((item) => item.name) : [];
  const mealIds = new Set(meals.map((item) => item.id));
  const mealEntries = Array.isArray(input.mealEntries) ? input.mealEntries.map(sanitiseMealEntry).filter((item) => item.date && mealIds.has(item.mealId)) : [];
  const supplements = Array.isArray(input.supplements) ? input.supplements.map(sanitiseSupplement).filter((item) => item.name) : [];
  const supplementIds = new Set(supplements.map((item) => item.id));
  const supplementEntries = Array.isArray(input.supplementEntries) ? input.supplementEntries.map(sanitiseSupplementEntry).filter((item) => item.date && supplementIds.has(item.supplementId)) : [];
  const goals = Array.isArray(input.goals) ? input.goals.map(sanitiseGoal).filter((item) => item.name) : [];
  const trash = Array.isArray(input.trash) ? input.trash.map(sanitiseTrashItem).filter(Boolean) : [];
  return { version: 6, sports, workouts, exercises, sessions, meals, mealEntries, supplements, supplementEntries, goals, trash };
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { showToast(t("storageError"), true); }
  updateSummary();
}

function plural(count, singularKey, pluralKey) { return `${count} ${t(count === 1 ? singularKey : pluralKey)}`; }

function updateSummary() {
  elements.summary.textContent = [plural(state.sports.length, "sportSingular", "sportPlural"), plural(state.workouts.length, "workoutSingular", "workoutPlural"), plural(state.exercises.length, "exerciseSingular", "exercisePlural"), plural(state.sessions.length, "sessionSingular", "sessionPlural"), plural(state.meals.length, "mealSingular", "mealPlural"), plural(state.supplements.length, "supplementSingular", "supplementPlural"), plural(state.goals.length, "goalSingular", "goalPlural")].join(" · ");
  elements.trashCount.textContent = String(state.trash.length);
}

function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.toggle("error", isError);
  elements.toast.classList.add("show");
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 3200);
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}

async function refreshStorage() {
  if (!navigator.storage?.estimate) { elements.storage.textContent = t("storageUnavailable"); return; }
  try {
    const { usage = 0, quota = 0 } = await navigator.storage.estimate();
    const percentage = quota ? Math.min(100, (usage / quota) * 100) : 0;
    elements.storage.textContent = `${formatBytes(usage)} / ${formatBytes(quota)} ${t("storageUsed")} (${percentage.toFixed(1)}%)`;
  } catch { elements.storage.textContent = t("storageUnavailable"); }
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME, { keyPath: "id" }); };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbAction(mode, action) {
  const db = await openDb();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, mode);
      const store = transaction.objectStore(STORE_NAME);
      const request = action(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally { db.close(); }
}

const putMedia = (record) => dbAction("readwrite", (store) => store.put(record));
const getMedia = (mediaId) => dbAction("readonly", (store) => store.get(mediaId));
const deleteMedia = (mediaId) => dbAction("readwrite", (store) => store.delete(mediaId));
const getAllMedia = () => dbAction("readonly", (store) => store.getAll());
const clearMedia = () => dbAction("readwrite", (store) => store.clear());

function revokeObjectUrls() { for (const url of objectUrls) URL.revokeObjectURL(url); objectUrls.clear(); }

function ensureSelection() {
  if (!state.sports.some((item) => item.id === selectedSportId)) selectedSportId = state.sports[0]?.id || null;
  const workouts = state.workouts.filter((item) => item.sportId === selectedSportId);
  if (!workouts.some((item) => item.id === selectedWorkoutId)) selectedWorkoutId = workouts[0]?.id || null;
}

function render() {
  ensureSelection();
  renderSports();
  renderWorkouts();
  renderPlan();
  renderCalendar();
  renderMeals();
  renderSupplements();
  renderGoals();
  renderTrash();
  renderView();
  updateSummary();
  refreshStorage();
}

function renderView() {
  elements.libraryView.hidden = activeView !== "library";
  elements.calendarView.hidden = activeView !== "calendar";
  elements.mealsView.hidden = activeView !== "meals";
  elements.supplementsView.hidden = activeView !== "supplements";
  elements.goalsView.hidden = activeView !== "goals";
  $$('[data-view]').forEach((button) => {
    const selected = button.dataset.view === activeView;
    button.setAttribute("aria-selected", String(selected));
  });
}

function setView(view) {
  activeView = ["library","calendar","meals","supplements","goals"].includes(view) ? view : "library";
  renderView();
  if (activeView === "calendar") renderCalendar();
  if (activeView === "meals") renderMeals();
  if (activeView === "supplements") renderSupplements();
  if (activeView === "goals") renderGoals();
}

function createCalendarIcon() {
  const svg = document.createElementNS("http\u003a//www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "action-icon"); svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
  const path = document.createElementNS("http\u003a//www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M6 3v3M18 3v3M4 8h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z");
  svg.append(path); return svg;
}

function createActionButton(label, symbol, action, itemId, className = "") {
  const button = document.createElement("button");
  button.type = "button"; button.dataset.action = action; button.dataset.id = itemId; button.className = className; button.setAttribute("aria-label", label); button.title = label;
  if (symbol === "calendar") button.append(createCalendarIcon()); else button.textContent = symbol;
  return button;
}

function renderSports() {
  elements.sportsList.replaceChildren();
  elements.sportsEmpty.hidden = state.sports.length > 0;
  elements.sportsList.hidden = state.sports.length === 0;
  for (const sport of state.sports) {
    const item = document.createElement("div"); item.className = `library-item${sport.id === selectedSportId ? " active" : ""}`;
    const select = document.createElement("button"); select.type = "button"; select.className = "item-select"; select.dataset.action = "select-sport"; select.dataset.id = sport.id;
    const name = document.createElement("strong"); name.textContent = sport.name;
    const count = state.workouts.filter((workout) => workout.sportId === sport.id).length;
    const meta = document.createElement("span"); meta.textContent = plural(count, "workoutSingular", "workoutPlural");
    select.append(name, meta);
    const menu = document.createElement("div"); menu.className = "item-menu";
    menu.append(createActionButton(t("editSport"), "✎", "edit-sport", sport.id), createActionButton(t("deleteSport"), "×", "delete-sport", sport.id, "danger"));
    item.append(select, menu); elements.sportsList.append(item);
  }
}

function renderWorkouts() {
  const sport = state.sports.find((item) => item.id === selectedSportId);
  const workouts = state.workouts.filter((item) => item.sportId === selectedSportId);
  elements.activeSportName.textContent = sport?.name || "";
  elements.workoutsList.replaceChildren();
  elements.workoutsEmpty.hidden = workouts.length > 0 || !sport;
  elements.workoutsList.hidden = workouts.length === 0;
  $("#new-workout").disabled = !sport;
  if (!sport) { elements.workoutsEmpty.hidden = true; return; }
  for (const workout of workouts) {
    const item = document.createElement("div"); item.className = `library-item${workout.id === selectedWorkoutId ? " active" : ""}`;
    const select = document.createElement("button"); select.type = "button"; select.className = "item-select"; select.dataset.action = "select-workout"; select.dataset.id = workout.id;
    const name = document.createElement("strong"); name.textContent = workout.name;
    const count = state.exercises.filter((exercise) => exercise.workoutId === workout.id).length;
    const meta = document.createElement("span"); meta.textContent = [plural(count, "exerciseSingular", "exercisePlural"), workout.duration].filter(Boolean).join(" · ");
    select.append(name, meta);
    const menu = document.createElement("div"); menu.className = "item-menu";
    menu.append(createActionButton(t("scheduleWorkout"), "calendar", "schedule-workout", workout.id), createActionButton(t("editWorkout"), "✎", "edit-workout", workout.id), createActionButton(t("duplicateWorkout"), "⧉", "duplicate-workout", workout.id), createActionButton(t("deleteWorkout"), "×", "delete-workout", workout.id, "danger"));
    item.append(select, menu); elements.workoutsList.append(item);
  }
}

function renderCalendar() {
  renderWeek();
  renderMonth();
  renderAgenda();
}

function renderMeals() {
  elements.mealsList.replaceChildren();
  elements.mealsList.hidden = state.meals.length === 0;
  elements.mealsEmpty.hidden = state.meals.length > 0;
  for (const meal of state.meals) {
    const card = document.createElement("article"); card.className = "meal-card";
    const header = document.createElement("header"); header.className = "meal-card-header";
    const copy = document.createElement("div");
    const type = document.createElement("span"); type.className = "meal-type"; type.textContent = t(meal.type);
    const title = document.createElement("h3"); title.textContent = meal.name;
    copy.append(type,title);
    const actions = document.createElement("div"); actions.className = "meal-card-actions";
    actions.append(createActionButton(t("scheduleMeal"),"calendar","schedule-meal",meal.id),createActionButton(t("editMeal"),"✎","edit-meal",meal.id),createActionButton(t("duplicateMeal"),"⧉","duplicate-meal",meal.id),createActionButton(t("deleteMeal"),"×","delete-meal",meal.id,"danger"));
    header.append(copy,actions); card.append(header);
    if (meal.description) { const description = document.createElement("p"); description.className = "meal-description"; description.textContent = meal.description; card.append(description); }
    if (meal.instructions) { const section = document.createElement("div"); section.className = "meal-detail"; const label = document.createElement("strong"); label.textContent = t("preparationOptional").replace(/\s*\([^)]*\)$/,""); const value = document.createElement("span"); value.textContent = meal.instructions; section.append(label,value); card.append(section); }
    if (meal.notes) { const section = document.createElement("div"); section.className = "meal-detail"; const label = document.createElement("strong"); label.textContent = t("notes"); const value = document.createElement("span"); value.textContent = meal.notes; section.append(label,value); card.append(section); }
    const planned = state.mealEntries.filter((entry) => entry.mealId === meal.id).length;
    const footer = document.createElement("div"); footer.className = "meal-card-footer"; footer.textContent = plural(planned,"mealEntrySingular","mealEntryPlural"); card.append(footer);
    elements.mealsList.append(card);
  }
}

function renderSupplements() {
  elements.supplementsList.replaceChildren();
  elements.supplementsList.hidden = state.supplements.length === 0;
  elements.supplementsEmpty.hidden = state.supplements.length > 0;
  for (const supplement of state.supplements) {
    const card = document.createElement("article"); card.className = "supplement-card";
    const header = document.createElement("header"); header.className = "supplement-card-header";
    const copy = document.createElement("div");
    const title = document.createElement("h3"); title.textContent = supplement.name; copy.append(title);
    const actions = document.createElement("div"); actions.className = "supplement-card-actions";
    actions.append(createActionButton(t("scheduleSupplement"),"calendar","schedule-supplement",supplement.id),createActionButton(t("editSupplement"),"✎","edit-supplement",supplement.id),createActionButton(t("duplicateSupplement"),"⧉","duplicate-supplement",supplement.id),createActionButton(t("deleteSupplement"),"×","delete-supplement",supplement.id,"danger"));
    header.append(copy,actions); card.append(header);
    for (const [key,value] of [["amountOptional",supplement.amount],["timingOptional",supplement.timing],["supplementInstructionsOptional",supplement.instructions],["notes",supplement.notes]]) {
      if (!value) continue;
      const section = document.createElement("div"); section.className = "supplement-detail";
      const label = document.createElement("strong"); label.textContent = t(key).replace(/\s*\([^)]*\)$/s,"");
      const text = document.createElement("span"); text.textContent = value; section.append(label,text); card.append(section);
    }
    const planned = state.supplementEntries.filter((entry) => entry.supplementId === supplement.id).length;
    const footer = document.createElement("div"); footer.className = "supplement-card-footer"; footer.textContent = plural(planned,"supplementEntrySingular","supplementEntryPlural"); card.append(footer);
    elements.supplementsList.append(card);
  }
}

function goalProgress(goal) { return Math.min(goal.target,goal.completedSessionIds.length + goal.manualProgress); }

function renderGoals() {
  elements.goalsList.replaceChildren();
  elements.goalsList.hidden = state.goals.length === 0;
  elements.goalsEmpty.hidden = state.goals.length > 0;
  for (const goal of state.goals) {
    const progress = goalProgress(goal);
    const complete = progress >= goal.target;
    const card = document.createElement("article"); card.className = `goal-card${complete ? " complete" : ""}`;
    const header = document.createElement("header"); header.className = "goal-card-header";
    const copy = document.createElement("div");
    const title = document.createElement("h3"); title.textContent = goal.name;
    const count = document.createElement("p"); count.textContent = `${progress} / ${goal.target}`;
    copy.append(title,count);
    const actions = document.createElement("div"); actions.className = "goal-actions";
    actions.append(createActionButton(t("editGoal"),t("edit"),"edit-goal",goal.id),createActionButton(t("deleteGoal"),t("delete"),"delete-goal",goal.id,"danger"));
    header.append(copy,actions);

    const dots = document.createElement("div"); dots.className = "goal-dots"; dots.setAttribute("role","group"); dots.setAttribute("aria-label",`${goal.name}: ${progress} / ${goal.target}`);
    for (let index = 1; index <= goal.target; index += 1) {
      const dot = document.createElement("button"); dot.type = "button"; dot.className = `goal-dot${index <= progress ? " filled" : ""}`; dot.dataset.action = "set-goal-progress"; dot.dataset.id = goal.id; dot.dataset.progress = String(index); dot.setAttribute("aria-label",`${index} / ${goal.target}`); dot.setAttribute("aria-pressed",String(index <= progress)); dot.textContent = index <= progress ? "✓" : ""; dots.append(dot);
    }

    const footer = document.createElement("div"); footer.className = "goal-card-footer";
    const hint = document.createElement("p"); hint.textContent = t("goalProgressHint"); footer.append(hint);
    if (complete) { const badge = document.createElement("span"); badge.className = "goal-complete-label"; badge.textContent = t("goalComplete"); footer.append(badge); }
    card.append(header,dots,footer); elements.goalsList.append(card);
  }
}

function renderTrash() {
  const items = [...state.trash].sort((a,b) => String(b.deletedAt).localeCompare(String(a.deletedAt)));
  elements.trashList.replaceChildren();
  elements.trashList.hidden = items.length === 0;
  elements.trashEmpty.hidden = items.length > 0;
  elements.emptyTrash.disabled = items.length === 0;
  elements.trashSummary.textContent = plural(items.length, "trashItemSingular", "trashItemPlural");
  elements.trashCount.textContent = String(items.length);
  for (const item of items) {
    const card = document.createElement("article"); card.className = "trash-item";
    const typeLabel = t(`type${item.type[0].toUpperCase()}${item.type.slice(1)}`);
    const icon = document.createElement("span"); icon.className = "trash-type-icon"; icon.textContent = typeLabel.slice(0,1).toLocaleUpperCase(dateLocale());
    const content = document.createElement("div"); content.className = "trash-item-copy";
    const type = document.createElement("span"); type.textContent = typeLabel;
    const title = document.createElement("h3"); title.textContent = item.label;
    const date = document.createElement("p"); date.textContent = `${t("deletedOn")} ${formatDate(new Date(item.deletedAt), { day: "numeric", month: "short", year: "numeric" })}`;
    content.append(type,title,date);
    const actions = document.createElement("div"); actions.className = "trash-item-actions";
    const restore = document.createElement("button"); restore.type = "button"; restore.className = "button secondary"; restore.dataset.action = "restore-trash"; restore.dataset.id = item.id; restore.textContent = t("restore");
    const remove = document.createElement("button"); remove.type = "button"; remove.className = "button danger-outline"; remove.dataset.action = "purge-trash"; remove.dataset.id = item.id; remove.textContent = t("permanentlyDelete");
    actions.append(restore,remove); card.append(icon,content,actions); elements.trashList.append(card);
  }
}

function renderWeek() {
  const selected = parseIsoDate(selectedDate);
  const first = startOfWeek(selected);
  const last = addDays(first, 6);
  const firstLabel = formatDate(first, { day: "numeric", month: first.getMonth() === last.getMonth() ? undefined : "short" });
  const lastLabel = formatDate(last, { day: "numeric", month: "long", year: "numeric" });
  elements.weekTitle.textContent = `${t("weekOf")} ${firstLabel} – ${lastLabel}`;
  elements.weekDays.replaceChildren();
  for (let index = 0; index < 7; index += 1) {
    const date = addDays(first, index);
    const iso = toLocalIso(date);
    const items = calendarItemsForDate(iso);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `week-day${iso === selectedDate ? " selected" : ""}${iso === toLocalIso(new Date()) ? " today" : ""}`;
    button.dataset.action = "select-date";
    button.dataset.date = iso;
    button.setAttribute("aria-label", `${formatDate(date, { weekday: "long", day: "numeric", month: "long" })}, ${plural(items.length, "calendarItemSingular", "calendarItemPlural")}`);
    const weekday = document.createElement("span"); weekday.className = "week-day-name"; weekday.textContent = formatDate(date, { weekday: "short" });
    const number = document.createElement("strong"); number.textContent = date.getDate();
    const count = document.createElement("span"); count.className = "week-day-count"; count.textContent = items.length ? String(items.length) : "—";
    const dots = document.createElement("span"); dots.className = "week-session-dots";
    for (const entry of items.slice(0, 4)) { const dot = document.createElement("i"); dot.className = `${entry.kind === "workout" ? "" : entry.kind}${entry.item.completed ? " done" : ""}`.trim(); dots.append(dot); }
    button.append(weekday, number, count, dots);
    elements.weekDays.append(button);
  }
}

function renderMonth() {
  elements.monthTitle.textContent = capitalise(formatDate(calendarMonth, { month: "long", year: "numeric" }));
  elements.calendarWeekdays.replaceChildren();
  const monday = startOfWeek(new Date(2024, 0, 1, 12));
  for (let index = 0; index < 7; index += 1) { const label = document.createElement("span"); label.textContent = formatDate(addDays(monday,index), { weekday: "short" }); elements.calendarWeekdays.append(label); }
  elements.calendarGrid.replaceChildren();
  const first = startOfWeek(calendarMonth);
  const today = toLocalIso(new Date());
  for (let index = 0; index < 42; index += 1) {
    const date = addDays(first,index);
    const iso = toLocalIso(date);
    const items = calendarItemsForDate(iso);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `calendar-day${date.getMonth() !== calendarMonth.getMonth() ? " outside" : ""}${iso === selectedDate ? " selected" : ""}${iso === today ? " today" : ""}`;
    button.dataset.action = "select-date"; button.dataset.date = iso;
    button.setAttribute("aria-label", `${formatDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}, ${plural(items.length, "calendarItemSingular", "calendarItemPlural")}`);
    const number = document.createElement("span"); number.className = "calendar-day-number"; number.textContent = date.getDate(); button.append(number);
    const entries = document.createElement("span"); entries.className = "calendar-entries";
    for (const entry of items.slice(0, 3)) {
      const record = entry.kind === "meal" ? state.meals.find((item) => item.id === entry.item.mealId) : entry.kind === "supplement" ? state.supplements.find((item) => item.id === entry.item.supplementId) : state.workouts.find((item) => item.id === entry.item.workoutId);
      if (!record) continue;
      const chip = document.createElement("span"); chip.className = `calendar-chip${entry.kind === "workout" ? "" : ` ${entry.kind}`}${entry.item.completed ? " completed" : ""}`; chip.textContent = `${entry.item.completed ? "✓ " : ""}${record.name}`; entries.append(chip);
    }
    if (items.length > 3) { const more = document.createElement("span"); more.className = "calendar-more"; more.textContent = `+${items.length - 3}`; entries.append(more); }
    button.append(entries); elements.calendarGrid.append(button);
  }
}

function renderAgenda() {
  const date = parseIsoDate(selectedDate);
  elements.agendaTitle.textContent = capitalise(formatDate(date, { weekday: "long", day: "numeric", month: "long" }));
  const items = calendarItemsForDate(selectedDate);
  elements.agendaList.replaceChildren();
  elements.agendaList.hidden = items.length === 0;
  elements.agendaEmpty.hidden = items.length > 0;
  for (const entry of items) {
    const calendarItem = entry.item;
    const sport = entry.kind === "workout" ? state.sports.find((item) => item.id === calendarItem.sportId) : null;
    const record = entry.kind === "meal" ? state.meals.find((item) => item.id === calendarItem.mealId) : entry.kind === "supplement" ? state.supplements.find((item) => item.id === calendarItem.supplementId) : state.workouts.find((item) => item.id === calendarItem.workoutId);
    if (!record || (entry.kind === "workout" && !sport)) continue;
    const card = document.createElement("article"); card.className = `agenda-item${entry.kind === "workout" ? "" : ` ${entry.kind}`}${calendarItem.completed ? " completed" : ""}`;
    const status = document.createElement("button"); status.type = "button"; status.className = "completion-toggle"; status.dataset.action = entry.kind === "meal" ? "toggle-meal-entry" : entry.kind === "supplement" ? "toggle-supplement-entry" : "toggle-session"; status.dataset.id = calendarItem.id;
    const statusKey = entry.kind === "meal" ? (calendarItem.completed ? "markMealIncomplete" : "markMealComplete") : entry.kind === "supplement" ? (calendarItem.completed ? "markSupplementIncomplete" : "markSupplementComplete") : (calendarItem.completed ? "markIncomplete" : "markComplete");
    status.setAttribute("aria-label", t(statusKey)); status.title = t(statusKey); status.textContent = calendarItem.completed ? "✓" : "";
    const content = document.createElement("div"); content.className = "agenda-content";
    const eyebrow = document.createElement("span"); eyebrow.textContent = entry.kind === "meal" ? `${t("meal")} · ${t(record.type)}` : entry.kind === "supplement" ? [t("supplement"),record.amount,record.timing].filter(Boolean).join(" · ") : sport.name;
    const title = document.createElement("h3"); title.textContent = record.name;
    content.append(eyebrow,title);
    if (calendarItem.notes) { const notes = document.createElement("p"); notes.textContent = calendarItem.notes; content.append(notes); }
    if (calendarItem.completed) { const badge = document.createElement("strong"); badge.className = "completed-label"; badge.textContent = t(entry.kind === "meal" ? "eaten" : entry.kind === "supplement" ? "taken" : "completed"); content.append(badge); }
    const actions = document.createElement("div"); actions.className = "agenda-actions";
    if (entry.kind === "meal") actions.append(createAgendaButton(t("openMeal"),"open-meal",record.id),createAgendaButton(t("editMealSchedule"),"edit-meal-entry",calendarItem.id),createAgendaButton(t("removeMealFromCalendar"),"delete-meal-entry",calendarItem.id,true));
    else if (entry.kind === "supplement") actions.append(createAgendaButton(t("openSupplement"),"open-supplement",record.id),createAgendaButton(t("editSupplementSchedule"),"edit-supplement-entry",calendarItem.id),createAgendaButton(t("removeSupplementFromCalendar"),"delete-supplement-entry",calendarItem.id,true));
    else actions.append(createAgendaButton(t("openWorkout"), "open-session", calendarItem.id), createAgendaButton(t("editSchedule"), "edit-session", calendarItem.id), createAgendaButton(t("removeFromCalendar"), "delete-session", calendarItem.id, true));
    card.append(status,content,actions); elements.agendaList.append(card);
  }
  if (items.length) {
    const addActions = document.createElement("div"); addActions.className = "agenda-add-actions";
    const addWorkout = document.createElement("button"); addWorkout.type = "button"; addWorkout.className = "button secondary"; addWorkout.dataset.action = "quick-plan"; addWorkout.textContent = t("scheduleAnotherWorkout");
    const addMeal = document.createElement("button"); addMeal.type = "button"; addMeal.className = "button secondary"; addMeal.dataset.action = "schedule-meal"; addMeal.textContent = t("scheduleAnotherMeal");
    const addSupplement = document.createElement("button"); addSupplement.type = "button"; addSupplement.className = "button secondary"; addSupplement.dataset.action = "schedule-supplement"; addSupplement.textContent = t("scheduleAnotherSupplement");
    addActions.append(addWorkout,addMeal,addSupplement); elements.agendaList.append(addActions);
  }
}

function createAgendaButton(label, action, sessionId, danger = false) {
  const button = document.createElement("button"); button.type = "button"; button.dataset.action = action; button.dataset.id = sessionId; button.textContent = label; if (danger) button.className = "danger"; return button;
}

async function renderPlan() {
  const token = ++planRenderToken;
  revokeObjectUrls();
  const workout = state.workouts.find((item) => item.id === selectedWorkoutId);
  elements.planEmpty.hidden = Boolean(workout);
  elements.planView.hidden = !workout;
  if (!workout) return;
  elements.planTitle.textContent = workout.name;
  elements.planDescription.textContent = workout.description || t("noDescription");
  elements.planMeta.replaceChildren();
  const exercises = state.exercises.filter((item) => item.workoutId === workout.id).sort((a,b) => a.order - b.order);
  for (const value of [workout.duration ? `${t("approx")} ${workout.duration}` : "", plural(exercises.length, "exerciseSingular", "exercisePlural")].filter(Boolean)) { const badge = document.createElement("span"); badge.textContent = value; elements.planMeta.append(badge); }
  elements.workoutNotes.hidden = !workout.notes; elements.workoutNotes.textContent = workout.notes ? `${t("notes")}: ${workout.notes}` : "";
  elements.exerciseCount.textContent = plural(exercises.length, "exerciseSingular", "exercisePlural");
  elements.exercisesEmpty.hidden = exercises.length > 0;
  elements.exerciseList.hidden = exercises.length === 0;
  elements.exerciseList.replaceChildren();
  for (const exercise of exercises) elements.exerciseList.append(createExerciseCard(exercise, exercises));
  for (const exercise of exercises) await renderExerciseMedia(exercise, token);
}

function createExerciseCard(exercise, ordered) {
  const li = document.createElement("li"); li.className = "exercise-card"; li.dataset.id = exercise.id; li.draggable = true;
  const number = document.createElement("span"); number.className = "exercise-number"; number.setAttribute("aria-hidden", "true");
  const main = document.createElement("div"); main.className = "exercise-main";
  const heading = document.createElement("div"); heading.className = "exercise-heading";
  const titleWrap = document.createElement("div"); const title = document.createElement("h3"); title.textContent = exercise.name; titleWrap.append(title);
  if (exercise.description) { const description = document.createElement("p"); description.className = "exercise-description"; description.textContent = exercise.description; titleWrap.append(description); }
  const actions = document.createElement("div"); actions.className = "exercise-actions";
  const index = ordered.findIndex((item) => item.id === exercise.id);
  const up = createActionButton(t("moveUp"), "↑", "move-up", exercise.id); up.disabled = index === 0;
  const down = createActionButton(t("moveDown"), "↓", "move-down", exercise.id); down.disabled = index === ordered.length - 1;
  actions.append(up, down, createActionButton(t("editExercise"), "✎", "edit-exercise", exercise.id), createActionButton(t("duplicateExercise"), "⧉", "duplicate-exercise", exercise.id), createActionButton(t("deleteExercise"), "×", "delete-exercise", exercise.id, "danger"));
  heading.append(titleWrap, actions); main.append(heading);
  if (exercise.details.length) { const row = document.createElement("div"); row.className = "exercise-facts"; for (const detail of exercise.details) { const fact = document.createElement("span"); fact.textContent = `${detail.key ? t(detail.key) : detail.label}: ${detail.value}`; row.append(fact); } main.append(row); }
  for (const [key,value] of [["instructions", exercise.instructions], ["notes", exercise.notes]]) if (value) { const detail = document.createElement("div"); detail.className = "exercise-detail"; const label = document.createElement("strong"); label.textContent = t(key); const text = document.createElement("span"); text.textContent = value; detail.append(label, text); main.append(detail); }
  const mediaSection = document.createElement("div"); mediaSection.className = "media-section";
  const mediaHeading = document.createElement("div"); mediaHeading.className = "media-heading"; const mediaTitle = document.createElement("strong"); mediaTitle.textContent = `${t("media")} (${exercise.media.length})`;
  const add = document.createElement("button"); add.type = "button"; add.dataset.action = "add-media"; add.dataset.id = exercise.id; add.textContent = `+ ${t("addMedia")}`;
  mediaHeading.append(mediaTitle, add); const grid = document.createElement("div"); grid.className = "media-grid"; grid.dataset.mediaFor = exercise.id;
  mediaSection.append(mediaHeading, grid); main.append(mediaSection); li.append(number, main);
  return li;
}

async function renderExerciseMedia(exercise, token) {
  const grid = elements.exerciseList.querySelector(`[data-media-for="${CSS.escape(exercise.id)}"]`);
  if (!grid || !exercise.media.length) return;
  for (const meta of exercise.media) {
    try {
      const record = await getMedia(meta.id);
      if (token !== planRenderToken || !grid.isConnected) return;
      if (!record?.blob) continue;
      const url = URL.createObjectURL(record.blob); objectUrls.add(url);
      const card = document.createElement("div"); card.className = "media-card";
      const visual = record.type.startsWith("video/") ? document.createElement("video") : document.createElement("img");
      visual.src = url;
      if (visual.tagName === "VIDEO") { visual.controls = true; visual.preload = "metadata"; }
      else { visual.alt = meta.name || t("unnamedMedia"); visual.loading = "lazy"; }
      const caption = document.createElement("div"); caption.className = "media-caption"; const name = document.createElement("span"); name.textContent = meta.name || t("unnamedMedia");
      const actions = document.createElement("div"); actions.className = "media-actions";
      const replace = document.createElement("button"); replace.type = "button"; replace.dataset.action = "replace-media"; replace.dataset.id = exercise.id; replace.dataset.mediaId = meta.id; replace.textContent = t("replace");
      const remove = document.createElement("button"); remove.type = "button"; remove.dataset.action = "remove-media"; remove.dataset.id = exercise.id; remove.dataset.mediaId = meta.id; remove.textContent = t("remove");
      actions.append(replace, remove); caption.append(name, actions); card.append(visual, caption); grid.append(card);
    } catch { /* A missing local blob should not hide the rest of the plan. */ }
  }
}

function formValues(form) { return Object.fromEntries(new FormData(form).entries()); }
function resetForm(form) { form.reset(); form.elements.id.value = ""; }

function detailKeyForLabel(label) {
  const normalised = clean(label,60).toLocaleLowerCase();
  return DETAIL_KEYS.find((key) => [translations.en[key],translations.pt[key]].some((value) => value?.toLocaleLowerCase() === normalised)) || "";
}

function renderDetailSuggestions() {
  elements.detailLabelOptions.replaceChildren();
  for (const key of DETAIL_KEYS) { const option = document.createElement("option"); option.value = t(key); elements.detailLabelOptions.append(option); }
}

function addCustomDetail(container,detail = {}) {
  const row = elements.customDetailTemplate.content.firstElementChild.cloneNode(true);
  row.dataset.detailId = detail.id || id(); row.dataset.detailKey = detail.key || "";
  row.querySelector("[data-detail-label]").textContent = t("detailLabel");
  row.querySelector("[data-detail-value]").textContent = t("detailValue");
  const labelInput = row.querySelector('[name="detailLabel"]'); const valueInput = row.querySelector('[name="detailValue"]');
  labelInput.placeholder = t("detailLabelPlaceholder"); valueInput.placeholder = t("detailValuePlaceholder");
  labelInput.value = detail.key ? t(detail.key) : (detail.label || ""); valueInput.value = detail.value || "";
  const remove = row.querySelector('[data-action="remove-custom-detail"]'); remove.setAttribute("aria-label",t("removeDetail")); remove.title = t("removeDetail");
  container.append(row); return row;
}

function readCustomDetails(container) {
  return $$(".custom-detail-row",container).slice(0,50).map((row) => {
    const label = clean(row.querySelector('[name="detailLabel"]')?.value,60);
    const value = clean(row.querySelector('[name="detailValue"]')?.value,120);
    const key = detailKeyForLabel(label);
    return value && label ? { id: clean(row.dataset.detailId,100) || id(), key, label: key ? "" : label, value } : null;
  }).filter(Boolean);
}

function openSportDialog(sport = null) {
  resetForm(elements.sportForm); elements.sportDialogTitle.textContent = sport ? t("editSport") : t("newSport");
  if (sport) { elements.sportForm.elements.id.value = sport.id; elements.sportForm.elements.name.value = sport.name; elements.sportForm.elements.description.value = sport.description; }
  elements.sportDialog.showModal(); setTimeout(() => elements.sportForm.elements.name.focus(), 0);
}

function openWorkoutDialog(workout = null) {
  if (!selectedSportId) { showToast(t("selectSportFirst"), true); return; }
  resetForm(elements.workoutForm); elements.workoutDialogTitle.textContent = workout ? t("editWorkout") : t("newWorkout");
  if (workout) for (const key of ["id","name","description","duration","notes"]) elements.workoutForm.elements[key].value = workout[key] || "";
  elements.workoutSchedule.hidden = Boolean(workout);
  elements.workoutForm.elements.scheduleEnabled.checked = false;
  elements.workoutForm.elements.scheduleDate.value = toLocalIso(new Date());
  updateNewWorkoutSchedule();
  elements.workoutDialog.showModal(); setTimeout(() => elements.workoutForm.elements.name.focus(), 0);
}

function updateNewWorkoutSchedule() {
  const enabled = !elements.workoutSchedule.hidden && elements.workoutForm.elements.scheduleEnabled.checked;
  elements.workoutDate.hidden = !enabled;
  elements.workoutForm.elements.scheduleDate.required = enabled;
}

function openMealDialog(meal = null) {
  resetForm(elements.mealForm); elements.mealDialogTitle.textContent = meal ? t("editMeal") : t("newMeal");
  if (meal) for (const key of ["id","name","type","description","instructions","notes"]) elements.mealForm.elements[key].value = meal[key] || "";
  elements.mealSchedule.hidden = Boolean(meal);
  elements.mealForm.elements.scheduleEnabled.checked = false;
  elements.mealForm.elements.scheduleDate.value = selectedDate;
  updateNewMealSchedule();
  elements.mealDialog.showModal(); setTimeout(() => elements.mealForm.elements.name.focus(),0);
}

function updateNewMealSchedule() {
  const enabled = !elements.mealSchedule.hidden && elements.mealForm.elements.scheduleEnabled.checked;
  elements.mealDate.hidden = !enabled;
  elements.mealForm.elements.scheduleDate.required = enabled;
}

function populateMealOptions(preferredMealId) {
  const select = elements.mealScheduleForm.elements.mealId; select.replaceChildren();
  for (const meal of state.meals) { const option = document.createElement("option"); option.value = meal.id; option.textContent = `${t(meal.type)} · ${meal.name}`; select.append(option); }
  if ([...select.options].some((option) => option.value === preferredMealId)) select.value = preferredMealId;
}

function openMealScheduleDialog(entry = null, mealId = null) {
  if (!state.meals.length) {
    openMealDialog(); elements.mealForm.elements.scheduleEnabled.checked = true; elements.mealForm.elements.scheduleDate.value = selectedDate; updateNewMealSchedule(); return;
  }
  resetForm(elements.mealScheduleForm); elements.mealScheduleDialogTitle.textContent = entry ? t("editMealSchedule") : t("scheduleMeal");
  populateMealOptions(entry?.mealId || mealId || state.meals[0].id);
  elements.mealScheduleForm.elements.id.value = entry?.id || "";
  elements.mealScheduleForm.elements.date.value = entry?.date || selectedDate;
  elements.mealScheduleForm.elements.notes.value = entry?.notes || "";
  elements.mealScheduleDialog.showModal(); setTimeout(() => elements.mealScheduleForm.elements.date.focus(),0);
}

function openSupplementDialog(supplement = null) {
  resetForm(elements.supplementForm); elements.supplementDialogTitle.textContent = supplement ? t("editSupplement") : t("newSupplement");
  if (supplement) for (const key of ["id","name","amount","timing","instructions","notes"]) elements.supplementForm.elements[key].value = supplement[key] || "";
  elements.supplementSchedule.hidden = Boolean(supplement);
  elements.supplementForm.elements.scheduleEnabled.checked = false;
  elements.supplementForm.elements.scheduleDate.value = selectedDate;
  updateNewSupplementSchedule();
  elements.supplementDialog.showModal(); setTimeout(() => elements.supplementForm.elements.name.focus(),0);
}

function updateNewSupplementSchedule() {
  const enabled = !elements.supplementSchedule.hidden && elements.supplementForm.elements.scheduleEnabled.checked;
  elements.supplementDate.hidden = !enabled;
  elements.supplementForm.elements.scheduleDate.required = enabled;
}

function populateSupplementOptions(preferredSupplementId) {
  const select = elements.supplementScheduleForm.elements.supplementId; select.replaceChildren();
  for (const supplement of state.supplements) { const option = document.createElement("option"); option.value = supplement.id; option.textContent = [supplement.name,supplement.amount,supplement.timing].filter(Boolean).join(" · "); select.append(option); }
  if ([...select.options].some((option) => option.value === preferredSupplementId)) select.value = preferredSupplementId;
}

function openSupplementScheduleDialog(entry = null, supplementId = null) {
  if (!state.supplements.length) {
    openSupplementDialog(); elements.supplementForm.elements.scheduleEnabled.checked = true; elements.supplementForm.elements.scheduleDate.value = selectedDate; updateNewSupplementSchedule(); return;
  }
  resetForm(elements.supplementScheduleForm); elements.supplementScheduleDialogTitle.textContent = entry ? t("editSupplementSchedule") : t("scheduleSupplement");
  populateSupplementOptions(entry?.supplementId || supplementId || state.supplements[0].id);
  elements.supplementScheduleForm.elements.id.value = entry?.id || "";
  elements.supplementScheduleForm.elements.date.value = entry?.date || selectedDate;
  elements.supplementScheduleForm.elements.notes.value = entry?.notes || "";
  elements.supplementScheduleDialog.showModal(); setTimeout(() => elements.supplementScheduleForm.elements.date.focus(),0);
}

function openExerciseDialog(exercise = null) {
  if (!selectedWorkoutId) { showToast(t("selectWorkoutFirst"), true); return; }
  resetForm(elements.exerciseForm); elements.exerciseDialogTitle.textContent = exercise ? t("editExercise") : t("newExercise");
  if (exercise) for (const key of ["id","name","description","instructions","notes"]) elements.exerciseForm.elements[key].value = exercise[key] || "";
  elements.exerciseDetails.replaceChildren();
  for (const detail of exercise?.details || []) addCustomDetail(elements.exerciseDetails,detail);
  if (!elements.exerciseDetails.children.length) addCustomDetail(elements.exerciseDetails);
  elements.exerciseDialog.showModal(); setTimeout(() => elements.exerciseForm.elements.name.focus(), 0);
}

function openGoalDialog(goal = null) {
  resetForm(elements.goalForm); elements.goalDialogTitle.textContent = goal ? t("editGoal") : t("newGoal");
  elements.goalForm.elements.target.value = goal?.target || 10;
  if (goal) { elements.goalForm.elements.id.value = goal.id; elements.goalForm.elements.name.value = goal.name; }
  elements.goalDialog.showModal(); setTimeout(() => elements.goalForm.elements.name.focus(),0);
}

function populateScheduleSports(preferredSportId) {
  const select = elements.scheduleForm.elements.sportId;
  select.replaceChildren();
  for (const sport of state.sports.filter((item) => state.workouts.some((workout) => workout.sportId === item.id))) {
    const option = document.createElement("option"); option.value = sport.id; option.textContent = sport.name; select.append(option);
  }
  if ([...select.options].some((option) => option.value === preferredSportId)) select.value = preferredSportId;
  populateScheduleWorkouts();
}

function populateScheduleWorkouts(preferredWorkoutId) {
  const select = elements.scheduleForm.elements.workoutId;
  const sportId = elements.scheduleForm.elements.sportId.value;
  select.replaceChildren();
  for (const workout of state.workouts.filter((item) => item.sportId === sportId)) {
    const option = document.createElement("option"); option.value = workout.id; option.textContent = workout.name; select.append(option);
  }
  if ([...select.options].some((option) => option.value === preferredWorkoutId)) select.value = preferredWorkoutId;
}

function openScheduleDialog(session = null, workoutId = null) {
  if (!state.workouts.length) { showToast(t("noWorkoutsToSchedule"), true); return; }
  resetForm(elements.scheduleForm);
  elements.scheduleDialogTitle.textContent = session ? t("editSchedule") : t("scheduleWorkout");
  const workout = state.workouts.find((item) => item.id === (session?.workoutId || workoutId || selectedWorkoutId)) || state.workouts[0];
  populateScheduleSports(session?.sportId || workout.sportId);
  populateScheduleWorkouts(session?.workoutId || workout.id);
  elements.scheduleForm.elements.id.value = session?.id || "";
  elements.scheduleForm.elements.date.value = session?.date || selectedDate;
  elements.scheduleForm.elements.notes.value = session?.notes || "";
  elements.scheduleDialog.showModal();
  setTimeout(() => elements.scheduleForm.elements.date.focus(), 0);
}

function addChoice(select, value, label) {
  const option = document.createElement("option"); option.value = value; option.textContent = label; select.append(option);
}

function updatePlannerExerciseNumbers() {
  const cards = $$(".planner-exercise", elements.plannerExercises);
  cards.forEach((card,index) => {
    card.querySelector("h4").textContent = `${t("exercise")} ${index + 1}`;
    const remove = card.querySelector('[data-action="remove-planner-exercise"]');
    remove.hidden = cards.length === 1;
    remove.setAttribute("aria-label", t("removeExercise"));
    remove.title = t("removeExercise");
  });
}

function addPlannerExercise() {
  const card = elements.plannerExerciseTemplate.content.firstElementChild.cloneNode(true);
  $$('[data-key]',card).forEach((node) => { node.textContent = t(node.dataset.key); });
  $$('[data-key-placeholder]',card).forEach((node) => { node.placeholder = t(node.dataset.keyPlaceholder); });
  addCustomDetail(card.querySelector(".planner-custom-details"));
  elements.plannerExercises.append(card); updatePlannerExerciseNumbers();
}

function updatePlannerWorkoutChoice(preferredWorkoutId = null) {
  const form = elements.plannerForm;
  const sportId = form.elements.sportChoice.value;
  const select = form.elements.workoutChoice;
  select.replaceChildren();
  const workouts = sportId === NEW_CHOICE ? [] : state.workouts.filter((item) => item.sportId === sportId);
  for (const workout of workouts) addChoice(select,workout.id,workout.name);
  addChoice(select,NEW_CHOICE,t("createNewWorkoutOption"));
  select.value = workouts.some((item) => item.id === preferredWorkoutId) ? preferredWorkoutId : (workouts[0]?.id || NEW_CHOICE);
  syncPlannerWorkoutFields();
}

function syncPlannerWorkoutFields() {
  const form = elements.plannerForm;
  const select = form.elements.workoutChoice;
  const creating = select.value === NEW_CHOICE;
  elements.plannerNewWorkout.hidden = !creating;
  form.elements.workoutName.required = creating;
}

function updatePlannerSportChoice(preferredWorkoutId = null) {
  const form = elements.plannerForm;
  const creating = form.elements.sportChoice.value === NEW_CHOICE;
  elements.plannerNewSport.hidden = !creating;
  form.elements.sportName.required = creating;
  updatePlannerWorkoutChoice(preferredWorkoutId);
}

function populatePlannerChoices() {
  const select = elements.plannerForm.elements.sportChoice;
  select.replaceChildren();
  for (const sport of state.sports) addChoice(select,sport.id,sport.name);
  addChoice(select,NEW_CHOICE,t("createNewSportOption"));
  select.value = state.sports.some((item) => item.id === selectedSportId) ? selectedSportId : (state.sports[0]?.id || NEW_CHOICE);
  updatePlannerSportChoice(selectedWorkoutId);
}

function openPlannerDialog() {
  elements.plannerForm.reset();
  elements.plannerExercises.replaceChildren();
  addPlannerExercise();
  elements.plannerForm.elements.date.value = selectedDate;
  populatePlannerChoices();
  elements.plannerDialog.showModal();
  setTimeout(() => elements.plannerForm.elements.sportChoice.focus(), 0);
}

function plannerExerciseDraft(card) {
  const value = (name,max) => clean(card.querySelector(`[name="${name}"]`)?.value,max);
  const fields = {
    name: value("plannerExerciseName",100), description: value("plannerExerciseDescription",1000), details: readCustomDetails(card.querySelector(".planner-custom-details")), instructions: value("plannerInstructions",1500), notes: value("plannerExerciseNotes",800)
  };
  return { fields, hasContent: Boolean(fields.name || fields.description || fields.details.length || fields.instructions || fields.notes), nameInput: card.querySelector('[name="plannerExerciseName"]') };
}

function handlePlannerSubmit(event) {
  event.preventDefault();
  if (!elements.plannerForm.reportValidity()) return;
  const form = elements.plannerForm;
  const drafts = [];
  for (const card of $$(".planner-exercise",elements.plannerExercises)) {
    const draft = plannerExerciseDraft(card); draft.nameInput.setCustomValidity("");
    if (!draft.hasContent) continue;
    if (!draft.fields.name) { draft.nameInput.setCustomValidity(t("requiredName")); draft.nameInput.reportValidity(); return; }
    drafts.push(draft.fields);
  }

  const plannerCreatedSport = form.elements.sportChoice.value === NEW_CHOICE;
  let sport = state.sports.find((item) => item.id === form.elements.sportChoice.value);
  if (plannerCreatedSport) sport = { id: id(), name: clean(form.elements.sportName.value,60), description: clean(form.elements.sportDescription.value,300), createdAt: now() };
  if (!sport?.name) { showToast(t("selectSportFirst"),true); return; }

  const plannerCreatedWorkout = form.elements.workoutChoice.value === NEW_CHOICE;
  let workout = state.workouts.find((item) => item.id === form.elements.workoutChoice.value && item.sportId === sport.id);
  if (plannerCreatedWorkout) workout = { id: id(), sportId: sport.id, name: clean(form.elements.workoutName.value,80), description: clean(form.elements.workoutDescription.value,500), duration: clean(form.elements.workoutDuration.value,40), notes: clean(form.elements.workoutNotes.value,200), createdAt: now() };
  if (!workout?.name) { showToast(t("selectWorkoutFirst"),true); return; }

  if (!state.sports.some((item) => item.id === sport.id)) state.sports.push(sport);
  if (!state.workouts.some((item) => item.id === workout.id)) state.workouts.push(workout);
  const startingOrder = state.exercises.filter((item) => item.workoutId === workout.id).length;
  drafts.forEach((fields,index) => state.exercises.push({ id: id(), workoutId: workout.id, ...fields, order: startingOrder + index, media: [], createdAt: now() }));
  const date = form.elements.date.value;
  state.sessions.push({ id: id(), sportId: sport.id, workoutId: workout.id, date, notes: clean(form.elements.sessionNotes.value,500), completed: false, plannerCreatedWorkout, plannerCreatedSport, createdAt: now() });
  selectedSportId = sport.id; selectedWorkoutId = workout.id; selectedDate = date; calendarMonth = startOfMonth(parseIsoDate(date)); activeView = "calendar";
  saveState(); elements.plannerDialog.close(); render(); showToast(t("planSaved"));
}

function handleSportSubmit(event) {
  event.preventDefault(); if (!elements.sportForm.reportValidity()) return;
  const values = formValues(elements.sportForm); const existing = state.sports.find((item) => item.id === values.id);
  if (existing) { existing.name = clean(values.name,60); existing.description = clean(values.description,300); }
  else { const sport = { id: id(), name: clean(values.name,60), description: clean(values.description,300), createdAt: now() }; state.sports.push(sport); selectedSportId = sport.id; selectedWorkoutId = null; }
  saveState(); elements.sportDialog.close(); render(); showToast(t("sportSaved"));
}

function handleWorkoutSubmit(event) {
  event.preventDefault(); if (!elements.workoutForm.reportValidity()) return;
  const values = formValues(elements.workoutForm); const existing = state.workouts.find((item) => item.id === values.id);
  let scheduled = false;
  if (existing) Object.assign(existing, { name: clean(values.name,80), description: clean(values.description,500), duration: clean(values.duration,40), notes: clean(values.notes,200) });
  else {
    const workout = { id: id(), sportId: selectedSportId, name: clean(values.name,80), description: clean(values.description,500), duration: clean(values.duration,40), notes: clean(values.notes,200), createdAt: now() };
    state.workouts.push(workout); selectedWorkoutId = workout.id;
    if (values.scheduleEnabled === "on" && /^\d{4}-\d{2}-\d{2}$/.test(values.scheduleDate || "")) {
      state.sessions.push({ id: id(), sportId: selectedSportId, workoutId: workout.id, date: values.scheduleDate, notes: "", completed: false, plannerCreatedWorkout: true, plannerCreatedSport: false, createdAt: now() });
      selectedDate = values.scheduleDate; calendarMonth = startOfMonth(parseIsoDate(selectedDate)); scheduled = true;
    }
  }
  saveState(); elements.workoutDialog.close(); render(); showToast(t(scheduled ? "workoutSavedAndScheduled" : "workoutSaved"));
}

function handleMealSubmit(event) {
  event.preventDefault(); if (!elements.mealForm.reportValidity()) return;
  const values = formValues(elements.mealForm); const existing = state.meals.find((item) => item.id === values.id);
  const fields = { name: clean(values.name,100), type: MEAL_TYPES.includes(values.type) ? values.type : "otherMeal", description: clean(values.description,1200), instructions: clean(values.instructions,1200), notes: clean(values.notes,500) };
  let scheduled = false;
  if (existing) Object.assign(existing,fields);
  else {
    const meal = { id: id(), ...fields, createdAt: now() }; state.meals.push(meal);
    if (values.scheduleEnabled === "on" && /^\d{4}-\d{2}-\d{2}$/.test(values.scheduleDate || "")) {
      state.mealEntries.push({ id: id(), mealId: meal.id, date: values.scheduleDate, notes: "", completed: false, createdAt: now() });
      selectedDate = values.scheduleDate; calendarMonth = startOfMonth(parseIsoDate(selectedDate)); scheduled = true;
    }
  }
  saveState(); elements.mealDialog.close(); render(); showToast(t(scheduled ? "mealSavedAndScheduled" : "mealSaved"));
}

function handleMealScheduleSubmit(event) {
  event.preventDefault(); if (!elements.mealScheduleForm.reportValidity()) return;
  const values = formValues(elements.mealScheduleForm);
  if (!state.meals.some((item) => item.id === values.mealId)) { showToast(t("noMealsToSchedule"),true); return; }
  const existing = state.mealEntries.find((item) => item.id === values.id);
  const fields = { mealId: values.mealId, date: values.date, notes: clean(values.notes,500) };
  if (existing) Object.assign(existing,fields);
  else state.mealEntries.push({ id: id(), ...fields, completed: false, createdAt: now() });
  selectedDate = values.date; calendarMonth = startOfMonth(parseIsoDate(selectedDate));
  saveState(); elements.mealScheduleDialog.close(); render(); showToast(t(existing ? "mealScheduleUpdated" : "mealScheduled"));
}

function handleSupplementSubmit(event) {
  event.preventDefault(); if (!elements.supplementForm.reportValidity()) return;
  const values = formValues(elements.supplementForm); const existing = state.supplements.find((item) => item.id === values.id);
  const fields = { name: clean(values.name,100), amount: clean(values.amount,80), timing: clean(values.timing,120), instructions: clean(values.instructions,1200), notes: clean(values.notes,500) };
  let scheduled = false;
  if (existing) Object.assign(existing,fields);
  else {
    const supplement = { id: id(), ...fields, createdAt: now() }; state.supplements.push(supplement);
    if (values.scheduleEnabled === "on" && /^\d{4}-\d{2}-\d{2}$/.test(values.scheduleDate || "")) {
      state.supplementEntries.push({ id: id(), supplementId: supplement.id, date: values.scheduleDate, notes: "", completed: false, createdAt: now() });
      selectedDate = values.scheduleDate; calendarMonth = startOfMonth(parseIsoDate(selectedDate)); scheduled = true;
    }
  }
  saveState(); elements.supplementDialog.close(); render(); showToast(t(scheduled ? "supplementSavedAndScheduled" : "supplementSaved"));
}

function handleSupplementScheduleSubmit(event) {
  event.preventDefault(); if (!elements.supplementScheduleForm.reportValidity()) return;
  const values = formValues(elements.supplementScheduleForm);
  if (!state.supplements.some((item) => item.id === values.supplementId)) { showToast(t("noSupplementsToSchedule"),true); return; }
  const existing = state.supplementEntries.find((item) => item.id === values.id);
  const fields = { supplementId: values.supplementId, date: values.date, notes: clean(values.notes,500) };
  if (existing) Object.assign(existing,fields);
  else state.supplementEntries.push({ id: id(), ...fields, completed: false, createdAt: now() });
  selectedDate = values.date; calendarMonth = startOfMonth(parseIsoDate(selectedDate));
  saveState(); elements.supplementScheduleDialog.close(); render(); showToast(t(existing ? "supplementScheduleUpdated" : "supplementScheduled"));
}

function handleExerciseSubmit(event) {
  event.preventDefault(); if (!elements.exerciseForm.reportValidity()) return;
  const values = formValues(elements.exerciseForm); const existing = state.exercises.find((item) => item.id === values.id);
  const fields = { name: clean(values.name,100), description: clean(values.description,1000), sets: "", reps: "", weight: "", distance: "", duration: "", rest: "", intensity: "", details: readCustomDetails(elements.exerciseDetails), instructions: clean(values.instructions,1500), notes: clean(values.notes,800) };
  if (existing) Object.assign(existing, fields);
  else { const current = state.exercises.filter((item) => item.workoutId === selectedWorkoutId); state.exercises.push({ id: id(), workoutId: selectedWorkoutId, ...fields, order: current.length, media: [], createdAt: now() }); }
  saveState(); elements.exerciseDialog.close(); render(); showToast(t("exerciseSaved"));
}

function handleGoalSubmit(event) {
  event.preventDefault(); if (!elements.goalForm.reportValidity()) return;
  const values = formValues(elements.goalForm);
  const target = Math.max(1,Math.min(365,Math.round(Number(values.target) || 10)));
  const existing = state.goals.find((item) => item.id === values.id);
  if (existing) {
    existing.name = clean(values.name,80); existing.target = target;
    existing.manualProgress = Math.min(existing.manualProgress,Math.max(0,target - existing.completedSessionIds.length));
  } else state.goals.push({ id: id(), name: clean(values.name,80), target, manualProgress: 0, completedSessionIds: [], createdAt: now() });
  saveState(); elements.goalDialog.close(); render(); showToast(t("goalSaved"));
}

function handleScheduleSubmit(event) {
  event.preventDefault(); if (!elements.scheduleForm.reportValidity()) return;
  const values = formValues(elements.scheduleForm);
  const workout = state.workouts.find((item) => item.id === values.workoutId && item.sportId === values.sportId);
  if (!workout) { showToast(t("noWorkoutsToSchedule"), true); return; }
  const existing = state.sessions.find((item) => item.id === values.id);
  if (existing) {
    const changedWorkout = existing.workoutId !== values.workoutId || existing.sportId !== values.sportId;
    Object.assign(existing, { sportId: values.sportId, workoutId: values.workoutId, date: values.date, notes: clean(values.notes,500) });
    if (changedWorkout) { existing.plannerCreatedWorkout = false; existing.plannerCreatedSport = false; }
  }
  else state.sessions.push({ id: id(), sportId: values.sportId, workoutId: values.workoutId, date: values.date, notes: clean(values.notes,500), completed: false, createdAt: now() });
  selectedDate = values.date; calendarMonth = startOfMonth(parseIsoDate(selectedDate));
  saveState(); elements.scheduleDialog.close(); render(); showToast(t(existing ? "sessionUpdated" : "sessionSaved"));
}

function addTrashItem(type, label, payload) {
  state.trash.unshift({ id: id(), type, label: clean(label,120) || type, deletedAt: now(), payload: cloneData(payload) });
}

function trashExercise(exerciseId) {
  const exercise = state.exercises.find((item) => item.id === exerciseId); if (!exercise) return false;
  const workout = state.workouts.find((item) => item.id === exercise.workoutId);
  const sport = state.sports.find((item) => item.id === workout?.sportId);
  addTrashItem("exercise", exercise.name, { sport, workout, exercise });
  state.exercises = state.exercises.filter((item) => item.id !== exerciseId); return true;
}

function trashWorkout(workoutId) {
  const workout = state.workouts.find((item) => item.id === workoutId); if (!workout) return false;
  const sport = state.sports.find((item) => item.id === workout.sportId);
  const exercises = state.exercises.filter((item) => item.workoutId === workoutId);
  const sessions = state.sessions.filter((item) => item.workoutId === workoutId);
  addTrashItem("workout", workout.name, { sport, workout, exercises, sessions });
  state.exercises = state.exercises.filter((item) => item.workoutId !== workoutId);
  state.sessions = state.sessions.filter((item) => item.workoutId !== workoutId);
  state.workouts = state.workouts.filter((item) => item.id !== workoutId); return true;
}

function trashSport(sportId) {
  const sport = state.sports.find((item) => item.id === sportId); if (!sport) return false;
  const workouts = state.workouts.filter((item) => item.sportId === sportId);
  const workoutIds = new Set(workouts.map((item) => item.id));
  const exercises = state.exercises.filter((item) => workoutIds.has(item.workoutId));
  const sessions = state.sessions.filter((item) => item.sportId === sportId || workoutIds.has(item.workoutId));
  addTrashItem("sport", sport.name, { sport, workouts, exercises, sessions });
  state.exercises = state.exercises.filter((item) => !workoutIds.has(item.workoutId));
  state.sessions = state.sessions.filter((item) => item.sportId !== sportId && !workoutIds.has(item.workoutId));
  state.workouts = state.workouts.filter((item) => item.sportId !== sportId);
  state.sports = state.sports.filter((item) => item.id !== sportId); return true;
}

function trashSession(sessionId) {
  const session = state.sessions.find((item) => item.id === sessionId); if (!session) return false;
  const workout = state.workouts.find((item) => item.id === session.workoutId);
  const sport = state.sports.find((item) => item.id === session.sportId);
  addTrashItem("session", workout?.name || t("typeSession"), { sport, workout, session });
  state.sessions = state.sessions.filter((item) => item.id !== sessionId); return true;
}

function trashGoal(goalId) {
  const goal = state.goals.find((item) => item.id === goalId); if (!goal) return false;
  addTrashItem("goal",goal.name,{ goal });
  state.goals = state.goals.filter((item) => item.id !== goalId); return true;
}

function trashMeal(mealId) {
  const meal = state.meals.find((item) => item.id === mealId); if (!meal) return false;
  const mealEntries = state.mealEntries.filter((item) => item.mealId === mealId);
  addTrashItem("meal",meal.name,{ meal, mealEntries });
  state.mealEntries = state.mealEntries.filter((item) => item.mealId !== mealId);
  state.meals = state.meals.filter((item) => item.id !== mealId); return true;
}

function trashMealEntry(entryId) {
  const mealEntry = state.mealEntries.find((item) => item.id === entryId); if (!mealEntry) return false;
  const meal = state.meals.find((item) => item.id === mealEntry.mealId);
  addTrashItem("mealEntry",meal?.name || t("typeMealEntry"),{ meal, mealEntry });
  state.mealEntries = state.mealEntries.filter((item) => item.id !== entryId); return true;
}

function trashSupplement(supplementId) {
  const supplement = state.supplements.find((item) => item.id === supplementId); if (!supplement) return false;
  const supplementEntries = state.supplementEntries.filter((item) => item.supplementId === supplementId);
  addTrashItem("supplement",supplement.name,{ supplement, supplementEntries });
  state.supplementEntries = state.supplementEntries.filter((item) => item.supplementId !== supplementId);
  state.supplements = state.supplements.filter((item) => item.id !== supplementId); return true;
}

function trashSupplementEntry(entryId) {
  const supplementEntry = state.supplementEntries.find((item) => item.id === entryId); if (!supplementEntry) return false;
  const supplement = state.supplements.find((item) => item.id === supplementEntry.supplementId);
  addTrashItem("supplementEntry",supplement?.name || t("typeSupplementEntry"),{ supplement, supplementEntry });
  state.supplementEntries = state.supplementEntries.filter((item) => item.id !== entryId); return true;
}

function createdTogether(first, second, limit = 2000) {
  const firstTime = Date.parse(first?.createdAt || "");
  const secondTime = Date.parse(second?.createdAt || "");
  return Number.isFinite(firstTime) && Number.isFinite(secondTime) && Math.abs(firstTime - secondTime) <= limit;
}

function sessionRemovalScope(sessionId) {
  const session = state.sessions.find((item) => item.id === sessionId); if (!session) return null;
  const workout = state.workouts.find((item) => item.id === session.workoutId);
  const sport = state.sports.find((item) => item.id === session.sportId);
  const hasOtherSessions = state.sessions.some((item) => item.id !== session.id && item.workoutId === session.workoutId);
  const ownsWorkout = Boolean(session.plannerCreatedWorkout) || createdTogether(session,workout);
  if (!workout || !ownsWorkout || hasOtherSessions) return { kind: "session", session };

  const sportWorkouts = state.workouts.filter((item) => item.sportId === session.sportId);
  const ownsSport = Boolean(session.plannerCreatedSport) || createdTogether(session,sport);
  if (sport && ownsSport && sportWorkouts.length === 1 && sportWorkouts[0].id === workout.id) return { kind: "sport", session };
  return { kind: "workout", session };
}

function trashSessionAndOwnedPlan(sessionId, scope = sessionRemovalScope(sessionId)) {
  if (!scope) return false;
  if (scope.kind === "sport") return trashSport(scope.session.sportId);
  if (scope.kind === "workout") return trashWorkout(scope.session.workoutId);
  return trashSession(sessionId);
}

function trashMedia(exerciseId, mediaId) {
  const exercise = state.exercises.find((item) => item.id === exerciseId); if (!exercise) return false;
  const media = exercise.media.find((item) => item.id === mediaId); if (!media) return false;
  const workout = state.workouts.find((item) => item.id === exercise.workoutId);
  const sport = state.sports.find((item) => item.id === workout?.sportId);
  const exerciseSnapshot = cloneData(exercise); exerciseSnapshot.media = exerciseSnapshot.media.filter((item) => item.id !== mediaId);
  addTrashItem("media", media.name || t("unnamedMedia"), { sport, workout, exercise: exerciseSnapshot, media });
  exercise.media = exercise.media.filter((item) => item.id !== mediaId); return true;
}

function pushUnique(collection, item) { if (item?.id && !collection.some((value) => value.id === item.id)) collection.push(cloneData(item)); }
function removeTrashEntry(entryId) { state.trash = state.trash.filter((item) => item.id !== entryId); }
function sportSnapshot(sportId, fallback = {}) { return state.trash.find((item) => item.type === "sport" && item.payload.sport?.id === sportId)?.payload.sport || fallback.sport || state.trash.map((item) => item.payload.sport).find((item) => item?.id === sportId); }
function workoutSnapshot(workoutId, fallback = {}) { return state.trash.find((item) => item.type === "workout" && item.payload.workout?.id === workoutId)?.payload.workout || fallback.workout || state.trash.map((item) => item.payload.workout).find((item) => item?.id === workoutId) || state.trash.flatMap((item) => item.payload.workouts || []).find((item) => item.id === workoutId); }
function exerciseSnapshot(exerciseId, fallback = {}) { return state.trash.find((item) => item.type === "exercise" && item.payload.exercise?.id === exerciseId)?.payload.exercise || fallback.exercise || state.trash.map((item) => item.payload.exercise).find((item) => item?.id === exerciseId) || state.trash.flatMap((item) => item.payload.exercises || []).find((item) => item.id === exerciseId); }
function mealSnapshot(mealId, fallback = {}) { return state.trash.find((item) => item.type === "meal" && item.payload.meal?.id === mealId)?.payload.meal || fallback.meal || state.trash.map((item) => item.payload.meal).find((item) => item?.id === mealId); }
function supplementSnapshot(supplementId, fallback = {}) { return state.trash.find((item) => item.type === "supplement" && item.payload.supplement?.id === supplementId)?.payload.supplement || fallback.supplement || state.trash.map((item) => item.payload.supplement).find((item) => item?.id === supplementId); }

function restoreSportEntry(entry) {
  const payload = entry.payload; if (!payload.sport) return false;
  pushUnique(state.sports,payload.sport);
  for (const workout of payload.workouts || []) pushUnique(state.workouts,workout);
  for (const exercise of payload.exercises || []) pushUnique(state.exercises,exercise);
  for (const session of payload.sessions || []) pushUnique(state.sessions,session);
  removeTrashEntry(entry.id); return true;
}

function restoreSportById(sportId, fallback = {}) {
  if (state.sports.some((item) => item.id === sportId)) return true;
  const entry = state.trash.find((item) => item.type === "sport" && item.payload.sport?.id === sportId);
  if (entry) return restoreSportEntry(entry);
  const sport = sportSnapshot(sportId,fallback); if (!sport) return false; pushUnique(state.sports,sport); return true;
}

function restoreWorkoutEntry(entry) {
  const payload = entry.payload; const workout = payload.workout; if (!workout || !restoreSportById(workout.sportId,payload)) return false;
  pushUnique(state.workouts,workout);
  for (const exercise of payload.exercises || []) pushUnique(state.exercises,exercise);
  for (const session of payload.sessions || []) pushUnique(state.sessions,session);
  removeTrashEntry(entry.id); return true;
}

function restoreWorkoutById(workoutId, fallback = {}) {
  if (state.workouts.some((item) => item.id === workoutId)) return true;
  const entry = state.trash.find((item) => item.type === "workout" && item.payload.workout?.id === workoutId);
  if (entry) return restoreWorkoutEntry(entry);
  const workout = workoutSnapshot(workoutId,fallback); if (!workout || !restoreSportById(workout.sportId,fallback)) return false; pushUnique(state.workouts,workout); return true;
}

function restoreExerciseEntry(entry) {
  const payload = entry.payload; const exercise = payload.exercise; if (!exercise || !restoreWorkoutById(exercise.workoutId,payload)) return false;
  pushUnique(state.exercises,exercise); removeTrashEntry(entry.id); return true;
}

function restoreExerciseById(exerciseId, fallback = {}) {
  if (state.exercises.some((item) => item.id === exerciseId)) return true;
  const entry = state.trash.find((item) => item.type === "exercise" && item.payload.exercise?.id === exerciseId);
  if (entry) return restoreExerciseEntry(entry);
  const exercise = exerciseSnapshot(exerciseId,fallback); if (!exercise || !restoreWorkoutById(exercise.workoutId,fallback)) return false; pushUnique(state.exercises,exercise); return true;
}

function restoreMealEntry(entry) {
  const payload = entry.payload; if (!payload.meal) return false;
  pushUnique(state.meals,payload.meal);
  for (const mealEntry of payload.mealEntries || []) pushUnique(state.mealEntries,mealEntry);
  removeTrashEntry(entry.id); return true;
}

function restoreMealById(mealId, fallback = {}) {
  if (state.meals.some((item) => item.id === mealId)) return true;
  const entry = state.trash.find((item) => item.type === "meal" && item.payload.meal?.id === mealId);
  if (entry) return restoreMealEntry(entry);
  const meal = mealSnapshot(mealId,fallback); if (!meal) return false; pushUnique(state.meals,meal); return true;
}

function restoreSupplementEntry(entry) {
  const payload = entry.payload; if (!payload.supplement) return false;
  pushUnique(state.supplements,payload.supplement);
  for (const supplementEntry of payload.supplementEntries || []) pushUnique(state.supplementEntries,supplementEntry);
  removeTrashEntry(entry.id); return true;
}

function restoreSupplementById(supplementId, fallback = {}) {
  if (state.supplements.some((item) => item.id === supplementId)) return true;
  const entry = state.trash.find((item) => item.type === "supplement" && item.payload.supplement?.id === supplementId);
  if (entry) return restoreSupplementEntry(entry);
  const supplement = supplementSnapshot(supplementId,fallback); if (!supplement) return false; pushUnique(state.supplements,supplement); return true;
}

function missingParentCount(entry) {
  const payload = entry.payload; let count = 0;
  const sportId = payload.sport?.id || payload.workout?.sportId || payload.session?.sportId;
  const workoutId = payload.workout?.id || payload.exercise?.workoutId || payload.session?.workoutId;
  const exerciseId = payload.exercise?.id;
  const mealId = payload.meal?.id || payload.mealEntry?.mealId;
  const supplementId = payload.supplement?.id || payload.supplementEntry?.supplementId;
  if (sportId && !state.sports.some((item) => item.id === sportId)) count += 1;
  if (["exercise","session","media"].includes(entry.type) && workoutId && !state.workouts.some((item) => item.id === workoutId)) count += 1;
  if (entry.type === "media" && exerciseId && !state.exercises.some((item) => item.id === exerciseId)) count += 1;
  if (entry.type === "mealEntry" && mealId && !state.meals.some((item) => item.id === mealId)) count += 1;
  if (entry.type === "supplementEntry" && supplementId && !state.supplements.some((item) => item.id === supplementId)) count += 1;
  return count;
}

function restoreTrashItem(entryId) {
  const entry = state.trash.find((item) => item.id === entryId); if (!entry) return false;
  if (missingParentCount(entry) && !confirm(t("restoreWithParents"))) return false;
  let restored = false;
  if (entry.type === "sport") restored = restoreSportEntry(entry);
  if (entry.type === "workout") restored = restoreWorkoutEntry(entry);
  if (entry.type === "exercise") restored = restoreExerciseEntry(entry);
  if (entry.type === "session") {
    const session = entry.payload.session;
    restored = Boolean(session && restoreWorkoutById(session.workoutId,entry.payload));
    if (restored) { pushUnique(state.sessions,session); removeTrashEntry(entry.id); }
  }
  if (entry.type === "goal") {
    const goal = entry.payload.goal;
    restored = Boolean(goal);
    if (restored) { pushUnique(state.goals,goal); removeTrashEntry(entry.id); }
  }
  if (entry.type === "meal") {
    restored = restoreMealEntry(entry);
  }
  if (entry.type === "mealEntry") {
    const mealEntry = entry.payload.mealEntry;
    restored = Boolean(mealEntry && restoreMealById(mealEntry.mealId,entry.payload));
    if (restored) { pushUnique(state.mealEntries,mealEntry); removeTrashEntry(entry.id); }
  }
  if (entry.type === "supplement") {
    restored = restoreSupplementEntry(entry);
  }
  if (entry.type === "supplementEntry") {
    const supplementEntry = entry.payload.supplementEntry;
    restored = Boolean(supplementEntry && restoreSupplementById(supplementEntry.supplementId,entry.payload));
    if (restored) { pushUnique(state.supplementEntries,supplementEntry); removeTrashEntry(entry.id); }
  }
  if (entry.type === "media") {
    const { exercise, media } = entry.payload;
    restored = Boolean(exercise && media && restoreExerciseById(exercise.id,entry.payload));
    if (restored) { const active = state.exercises.find((item) => item.id === exercise.id); if (active && !active.media.some((item) => item.id === media.id)) active.media.push(cloneData(media)); removeTrashEntry(entry.id); }
  }
  if (!restored) showToast(t("cannotRestore"),true);
  return restored;
}

function syncGoalsWithSession(session) {
  for (const goal of state.goals) {
    const hasSession = goal.completedSessionIds.includes(session.id);
    if (session.completed && !hasSession) goal.completedSessionIds.push(session.id);
    if (!session.completed && hasSession) goal.completedSessionIds = goal.completedSessionIds.filter((sessionId) => sessionId !== session.id);
  }
}

function setGoalProgress(goalId,selectedProgress) {
  const goal = state.goals.find((item) => item.id === goalId); if (!goal) return false;
  const current = goalProgress(goal);
  const clicked = Math.max(1,Math.min(goal.target,Math.round(Number(selectedProgress) || 1)));
  const desired = clicked <= current ? current - 1 : clicked;
  goal.manualProgress = Math.max(0,Math.min(goal.target - Math.min(goal.target,goal.completedSessionIds.length),desired - goal.completedSessionIds.length));
  return true;
}

function referencedMediaIds() {
  const ids = new Set(); const collectExercise = (exercise) => { for (const media of exercise?.media || []) ids.add(media.id); };
  state.exercises.forEach(collectExercise);
  for (const item of state.trash) { collectExercise(item.payload.exercise); (item.payload.exercises || []).forEach(collectExercise); if (item.payload.media?.id) ids.add(item.payload.media.id); }
  return ids;
}

async function cleanupOrphanMedia() {
  const referenced = referencedMediaIds(); const records = await getAllMedia();
  await Promise.allSettled(records.filter((record) => !referenced.has(record.id)).map((record) => deleteMedia(record.id)));
}

async function purgeTrashItem(entryId) { removeTrashEntry(entryId); await cleanupOrphanMedia(); }
async function emptyTrash() { state.trash = []; await cleanupOrphanMedia(); }

async function duplicateExercise(exerciseId, targetWorkoutId = selectedWorkoutId, rename = true) {
  const source = state.exercises.find((item) => item.id === exerciseId); if (!source) return null;
  const clone = { ...source, id: id(), workoutId: targetWorkoutId, name: rename ? `${source.name} (${t("copiedSuffix")})` : source.name, order: state.exercises.filter((item) => item.workoutId === targetWorkoutId).length, media: [], createdAt: now() };
  for (const meta of source.media) {
    try { const record = await getMedia(meta.id); if (!record?.blob) continue; const mediaId = id(); await putMedia({ ...record, id: mediaId, exerciseId: clone.id }); clone.media.push({ ...meta, id: mediaId }); } catch {}
  }
  state.exercises.push(clone); return clone;
}

async function duplicateWorkout(workoutId) {
  const source = state.workouts.find((item) => item.id === workoutId); if (!source) return;
  const clone = { ...source, id: id(), name: `${source.name} (${t("copiedSuffix")})`, createdAt: now() }; state.workouts.push(clone);
  const exercises = state.exercises.filter((item) => item.workoutId === source.id).sort((a,b) => a.order-b.order);
  for (const exercise of exercises) await duplicateExercise(exercise.id, clone.id, false);
  selectedSportId = clone.sportId; selectedWorkoutId = clone.id; saveState(); render(); showToast(t("sportDuplicated"));
}

function duplicateMeal(mealId) {
  const source = state.meals.find((item) => item.id === mealId); if (!source) return;
  state.meals.push({ ...source, id: id(), name: `${source.name} (${t("copiedSuffix")})`, createdAt: now() });
  saveState(); render(); showToast(t("mealSaved"));
}

function duplicateSupplement(supplementId) {
  const source = state.supplements.find((item) => item.id === supplementId); if (!source) return;
  state.supplements.push({ ...source, id: id(), name: `${source.name} (${t("copiedSuffix")})`, createdAt: now() });
  saveState(); render(); showToast(t("supplementSaved"));
}

function moveExercise(exerciseId, delta) {
  const ordered = state.exercises.filter((item) => item.workoutId === selectedWorkoutId).sort((a,b) => a.order-b.order);
  const index = ordered.findIndex((item) => item.id === exerciseId); const next = index + delta;
  if (index < 0 || next < 0 || next >= ordered.length) return;
  [ordered[index], ordered[next]] = [ordered[next], ordered[index]]; ordered.forEach((item, order) => { item.order = order; });
  saveState(); renderPlan();
}

async function handleAction(action, target) {
  const itemId = target.dataset.id;
  if (action === "new-sport") return openSportDialog();
  if (action === "new-workout") return openWorkoutDialog();
  if (action === "new-exercise") return openExerciseDialog();
  if (action === "new-meal") return openMealDialog();
  if (action === "new-supplement") return openSupplementDialog();
  if (action === "new-goal") return openGoalDialog();
  if (action === "new-session" || action === "quick-plan") return openPlannerDialog();
  if (action === "add-planner-exercise") { addPlannerExercise(); return; }
  if (action === "remove-planner-exercise") { target.closest(".planner-exercise")?.remove(); if (!elements.plannerExercises.children.length) addPlannerExercise(); else updatePlannerExerciseNumbers(); return; }
  if (action === "add-custom-detail") { const container = target.dataset.target ? $(`#${CSS.escape(target.dataset.target)}`) : target.closest(".planner-exercise")?.querySelector(".planner-custom-details"); const row = container && addCustomDetail(container); row?.querySelector('[name="detailLabel"]')?.focus(); return; }
  if (action === "remove-custom-detail") { target.closest(".custom-detail-row")?.remove(); return; }
  if (action === "open-trash") { renderTrash(); elements.trashDialog.showModal(); return; }
  if (action === "restore-trash") { if (restoreTrashItem(itemId)) { saveState(); render(); showToast(t("restoredFromTrash")); } return; }
  if (action === "purge-trash") { if (!confirm(t("confirmPermanentDelete"))) return; await purgeTrashItem(itemId); saveState(); render(); refreshStorage(); showToast(t("permanentlyDeleted")); return; }
  if (action === "empty-trash") { if (!state.trash.length || !confirm(t("confirmEmptyTrash"))) return; await emptyTrash(); saveState(); render(); refreshStorage(); showToast(t("trashCleared")); return; }
  if (action === "schedule-workout") return openScheduleDialog(null, itemId || selectedWorkoutId);
  if (action === "schedule-meal") return openMealScheduleDialog(null,itemId);
  if (action === "schedule-supplement") return openSupplementScheduleDialog(null,itemId);
  if (action === "select-date") { selectedDate = target.dataset.date; calendarMonth = startOfMonth(parseIsoDate(selectedDate)); renderCalendar(); return; }
  if (action === "today") { selectedDate = toLocalIso(new Date()); calendarMonth = startOfMonth(new Date()); renderCalendar(); return; }
  if (action === "previous-week" || action === "next-week") { selectedDate = toLocalIso(addDays(parseIsoDate(selectedDate), action === "previous-week" ? -7 : 7)); calendarMonth = startOfMonth(parseIsoDate(selectedDate)); renderCalendar(); return; }
  if (action === "previous-month" || action === "next-month") { const amount = action === "previous-month" ? -1 : 1; calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + amount, 1, 12); selectedDate = toLocalIso(calendarMonth); renderCalendar(); return; }
  if (action === "select-sport") { selectedSportId = itemId; selectedWorkoutId = state.workouts.find((item) => item.sportId === itemId)?.id || null; return render(); }
  if (action === "select-workout") { selectedWorkoutId = itemId; return render(); }
  if (action === "edit-sport") return openSportDialog(state.sports.find((item) => item.id === itemId));
  if (action === "edit-workout") return openWorkoutDialog(state.workouts.find((item) => item.id === (itemId || selectedWorkoutId)));
  if (action === "edit-exercise") return openExerciseDialog(state.exercises.find((item) => item.id === itemId));
  if (action === "edit-meal") return openMealDialog(state.meals.find((item) => item.id === itemId));
  if (action === "edit-supplement") return openSupplementDialog(state.supplements.find((item) => item.id === itemId));
  if (action === "edit-goal") return openGoalDialog(state.goals.find((item) => item.id === itemId));
  if (action === "duplicate-workout") return duplicateWorkout(itemId || selectedWorkoutId);
  if (action === "duplicate-exercise") { const clone = await duplicateExercise(itemId); if (clone) { saveState(); render(); showToast(t("exerciseDuplicated")); } return; }
  if (action === "duplicate-meal") return duplicateMeal(itemId);
  if (action === "duplicate-supplement") return duplicateSupplement(itemId);
  if (action === "move-up") return moveExercise(itemId,-1);
  if (action === "move-down") return moveExercise(itemId,1);
  if (action === "add-media" || action === "replace-media") { mediaTarget = { exerciseId: itemId, replaceId: target.dataset.mediaId || null }; elements.mediaInput.multiple = action === "add-media"; elements.mediaInput.value = ""; elements.mediaInput.click(); return; }
  if (action === "remove-media") return removeMediaItem(itemId,target.dataset.mediaId);
  if (action === "edit-session") return openScheduleDialog(state.sessions.find((item) => item.id === itemId));
  if (action === "edit-meal-entry") return openMealScheduleDialog(state.mealEntries.find((item) => item.id === itemId));
  if (action === "edit-supplement-entry") return openSupplementScheduleDialog(state.supplementEntries.find((item) => item.id === itemId));
  if (action === "open-session") { const session = state.sessions.find((item) => item.id === itemId); if (!session) return; selectedSportId = session.sportId; selectedWorkoutId = session.workoutId; activeView = "library"; render(); return; }
  if (action === "open-meal") { if (!state.meals.some((item) => item.id === itemId)) return; activeView = "meals"; render(); return; }
  if (action === "open-supplement") { if (!state.supplements.some((item) => item.id === itemId)) return; activeView = "supplements"; render(); return; }
  if (action === "toggle-session") { const session = state.sessions.find((item) => item.id === itemId); if (!session) return; session.completed = !session.completed; syncGoalsWithSession(session); saveState(); renderCalendar(); renderGoals(); updateSummary(); showToast(t(session.completed ? "sessionCompleted" : "sessionReopened")); return; }
  if (action === "toggle-meal-entry") { const entry = state.mealEntries.find((item) => item.id === itemId); if (!entry) return; entry.completed = !entry.completed; saveState(); renderCalendar(); showToast(t(entry.completed ? "mealCompleted" : "mealReopened")); return; }
  if (action === "toggle-supplement-entry") { const entry = state.supplementEntries.find((item) => item.id === itemId); if (!entry) return; entry.completed = !entry.completed; saveState(); renderCalendar(); showToast(t(entry.completed ? "supplementCompleted" : "supplementReopened")); return; }
  if (action === "set-goal-progress") { if (setGoalProgress(itemId,target.dataset.progress)) { saveState(); renderGoals(); showToast(t("goalProgressUpdated")); } return; }
  if (action === "delete-session") {
    const scope = sessionRemovalScope(itemId); if (!scope) return;
    if (!confirm(t(scope.kind === "session" ? "confirmDeleteSession" : "confirmDeleteOwnedPlan"))) return;
    if (trashSessionAndOwnedPlan(itemId,scope)) { saveState(); render(); showToast(t("movedToTrash")); }
    return;
  }
  if (action === "delete-exercise") { if (!confirm(t("confirmDeleteExercise"))) return; if (trashExercise(itemId)) { saveState(); render(); showToast(t("movedToTrash")); } return; }
  if (action === "delete-meal-entry") { if (!confirm(t("confirmDeleteMealEntry"))) return; if (trashMealEntry(itemId)) { saveState(); render(); showToast(t("movedToTrash")); } return; }
  if (action === "delete-meal") { if (!confirm(t("confirmDeleteMeal"))) return; if (trashMeal(itemId)) { saveState(); render(); showToast(t("movedToTrash")); } return; }
  if (action === "delete-supplement-entry") { if (!confirm(t("confirmDeleteSupplementEntry"))) return; if (trashSupplementEntry(itemId)) { saveState(); render(); showToast(t("movedToTrash")); } return; }
  if (action === "delete-supplement") { if (!confirm(t("confirmDeleteSupplement"))) return; if (trashSupplement(itemId)) { saveState(); render(); showToast(t("movedToTrash")); } return; }
  if (action === "delete-goal") { if (!confirm(t("confirmDeleteGoal"))) return; if (trashGoal(itemId)) { saveState(); render(); showToast(t("movedToTrash")); } return; }
  if (action === "delete-workout") { const workoutId = itemId || selectedWorkoutId; if (!confirm(t("confirmDeleteWorkout"))) return; if (trashWorkout(workoutId)) { if (selectedWorkoutId === workoutId) selectedWorkoutId = null; saveState(); render(); showToast(t("movedToTrash")); } return; }
  if (action === "delete-sport") { if (!confirm(t("confirmDeleteSport"))) return; if (trashSport(itemId)) { if (selectedSportId === itemId) { selectedSportId = null; selectedWorkoutId = null; } saveState(); render(); showToast(t("movedToTrash")); } }
}

async function handleMediaFiles(files) {
  const target = mediaTarget; mediaTarget = null; if (!target || !files.length) return;
  const exercise = state.exercises.find((item) => item.id === target.exerciseId); if (!exercise) return;
  const selected = target.replaceId ? [files[0]] : [...files];
  try { await navigator.storage?.persist?.(); } catch {}
  for (const file of selected) {
    if (!/^(image|video)\//.test(file.type)) { showToast(t("unsupportedMedia"),true); continue; }
    if (file.size > MAX_FILE_SIZE) { showToast(t("fileTooLarge"),true); continue; }
    try {
      const mediaId = target.replaceId || id();
      await putMedia({ id: mediaId, exerciseId: exercise.id, name: file.name, type: file.type, size: file.size, blob: file, createdAt: now() });
      const meta = { id: mediaId, name: file.name, type: file.type, size: file.size };
      const index = exercise.media.findIndex((item) => item.id === mediaId);
      if (index >= 0) exercise.media[index] = meta; else exercise.media.push(meta);
      saveState(); showToast(t(target.replaceId ? "mediaReplaced" : "mediaSaved"));
      if (target.replaceId) break;
    } catch { showToast(t("storageError"),true); }
  }
  renderPlan(); refreshStorage();
}

async function removeMediaItem(exerciseId, mediaId) {
  if (!confirm(t("confirmDeleteMedia"))) return;
  if (!trashMedia(exerciseId,mediaId)) return;
  saveState(); render(); refreshStorage(); showToast(t("movedToTrash"));
}

function blobToDataUrl(blob) { return new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(reader.error); reader.readAsDataURL(blob); }); }
function dataUrlToBlob(dataUrl) { const [header,data] = String(dataUrl).split(","); if (!header || !data) throw new Error("Invalid data URL"); const type = /data:([^;]+)/.exec(header)?.[1] || "application/octet-stream"; const binary = atob(data); const bytes = new Uint8Array(binary.length); for (let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i); return new Blob([bytes],{type}); }

async function exportBackup() {
  try {
    const records = await getAllMedia(); const media = [];
    for (const record of records) media.push({ id: record.id, exerciseId: record.exerciseId, name: record.name, type: record.type, size: record.size, createdAt: record.createdAt, data: await blobToDataUrl(record.blob) });
    const payload = { app: "training-atlas", version: 6, exportedAt: now(), library: state, media };
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `training-atlas-backup-${new Date().toISOString().slice(0,10)}.json`; anchor.click(); setTimeout(() => URL.revokeObjectURL(url),1000); showToast(t("backupReady"));
  } catch { showToast(t("exportError"),true); }
}

async function importBackup(file) {
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    if (payload?.app !== "training-atlas" || !payload.library || !Array.isArray(payload.media)) throw new Error("Invalid backup");
    if (!confirm(t("confirmImport"))) return;
    const nextState = normaliseState(payload.library); await clearMedia();
    for (const record of payload.media) {
      const mediaId = clean(record.id,100); if (!mediaId || typeof record.data !== "string") continue;
      const blob = dataUrlToBlob(record.data); if (blob.size > MAX_FILE_SIZE || !/^(image|video)\//.test(blob.type)) continue;
      await putMedia({ id: mediaId, exerciseId: clean(record.exerciseId,100), name: clean(record.name,240), type: blob.type, size: blob.size, blob, createdAt: record.createdAt || now() });
    }
    state = nextState; selectedSportId = state.sports[0]?.id || null; selectedWorkoutId = state.workouts.find((item) => item.sportId === selectedSportId)?.id || null; saveState(); render(); showToast(t("importComplete"));
  } catch { showToast(t("invalidBackup"),true); }
  finally { elements.importInput.value = ""; }
}

function applyLanguage(next) {
  language = saveLanguage(next); document.documentElement.lang = language === "pt" ? "pt-PT" : "en"; document.title = "Training Atlas — EstrelaLuaApps";
  applyTranslations(document,translations,language);
  renderDetailSuggestions();
  render();
}

document.addEventListener("click", (event) => { const target = event.target.closest("[data-action]"); if (target) handleAction(target.dataset.action,target); const view = event.target.closest("[data-view]"); if (view) setView(view.dataset.view); });
$("#new-sport").addEventListener("click", () => openSportDialog());
$("#new-sport-small").addEventListener("click", () => openSportDialog());
$("#new-workout").addEventListener("click", () => openWorkoutDialog());
elements.sportForm.addEventListener("submit",handleSportSubmit);
elements.workoutForm.addEventListener("submit",handleWorkoutSubmit);
elements.workoutForm.elements.scheduleEnabled.addEventListener("change",updateNewWorkoutSchedule);
elements.exerciseForm.addEventListener("submit",handleExerciseSubmit);
elements.mealForm.addEventListener("submit",handleMealSubmit);
elements.mealForm.elements.scheduleEnabled.addEventListener("change",updateNewMealSchedule);
elements.mealScheduleForm.addEventListener("submit",handleMealScheduleSubmit);
elements.supplementForm.addEventListener("submit",handleSupplementSubmit);
elements.supplementForm.elements.scheduleEnabled.addEventListener("change",updateNewSupplementSchedule);
elements.supplementScheduleForm.addEventListener("submit",handleSupplementScheduleSubmit);
elements.goalForm.addEventListener("submit",handleGoalSubmit);
elements.scheduleForm.addEventListener("submit",handleScheduleSubmit);
elements.scheduleForm.elements.sportId.addEventListener("change",() => populateScheduleWorkouts());
elements.plannerForm.addEventListener("submit",handlePlannerSubmit);
elements.plannerForm.elements.sportChoice.addEventListener("change",() => updatePlannerSportChoice());
elements.plannerForm.elements.workoutChoice.addEventListener("change",syncPlannerWorkoutFields);
elements.plannerForm.addEventListener("input",(event) => { if (event.target.name === "plannerExerciseName") event.target.setCustomValidity(""); });
for (const dialog of [elements.sportDialog,elements.workoutDialog,elements.exerciseDialog,elements.scheduleDialog,elements.mealDialog,elements.mealScheduleDialog,elements.supplementDialog,elements.supplementScheduleDialog,elements.plannerDialog,elements.goalDialog,elements.trashDialog]) for (const button of $$('button[value="cancel"]',dialog)) button.addEventListener("click",(event) => { event.preventDefault(); dialog.close(); });
elements.mediaInput.addEventListener("change", () => handleMediaFiles(elements.mediaInput.files));
$("#export-backup").addEventListener("click",exportBackup);
elements.importInput.addEventListener("change",() => importBackup(elements.importInput.files[0]));

elements.exerciseList.addEventListener("dragstart",(event) => { const card = event.target.closest(".exercise-card"); if (!card) return; draggedExerciseId = card.dataset.id; card.classList.add("dragging"); event.dataTransfer.effectAllowed = "move"; });
elements.exerciseList.addEventListener("dragend",(event) => { event.target.closest(".exercise-card")?.classList.remove("dragging"); $$(".drag-over",elements.exerciseList).forEach((item) => item.classList.remove("drag-over")); draggedExerciseId = null; });
elements.exerciseList.addEventListener("dragover",(event) => { const card = event.target.closest(".exercise-card"); if (!card || card.dataset.id === draggedExerciseId) return; event.preventDefault(); $$(".drag-over",elements.exerciseList).forEach((item) => item.classList.remove("drag-over")); card.classList.add("drag-over"); });
elements.exerciseList.addEventListener("drop",(event) => { const card = event.target.closest(".exercise-card"); if (!card || !draggedExerciseId || card.dataset.id === draggedExerciseId) return; event.preventDefault(); const ordered = state.exercises.filter((item) => item.workoutId === selectedWorkoutId).sort((a,b) => a.order-b.order); const from = ordered.findIndex((item) => item.id === draggedExerciseId); const to = ordered.findIndex((item) => item.id === card.dataset.id); const [moved] = ordered.splice(from,1); ordered.splice(to,0,moved); ordered.forEach((item,index) => { item.order = index; }); saveState(); renderPlan(); showToast(t("orderUpdated")); });

window.addEventListener("beforeunload",revokeObjectUrls);
createLanguageSwitch({ container: $("#language-switch"), language, onChange: applyLanguage });
applyLanguage(language);
