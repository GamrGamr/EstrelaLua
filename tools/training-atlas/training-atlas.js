import { applyTranslations, createLanguageSwitch, getLanguage, saveLanguage } from "../../assets/i18n-core.js";

const STORAGE_KEY = "training-atlas-library-v1";
const DB_NAME = "training-atlas-media";
const DB_VERSION = 1;
const STORE_NAME = "media";
const MAX_FILE_SIZE = 250 * 1024 * 1024;

const translations = {
  en: {
    description: "Organise sports, workouts, exercises, images, and videos privately on this device.", skip: "Skip to organiser", home: "EstrelaLuaApps home", nav: "Application navigation", allApps: "All apps", about: "About",
    kicker: "Private training library", intro: "Create any sport, organise its workouts, and keep every exercise and demonstration ready when you train.", localTitle: "Stored only on this device", localCopy: "No account, uploads, analytics, or external requests.",
    libraryTools: "Library tools", storageChecking: "Checking local storage…", export: "Export backup", import: "Import backup", newSport: "New sport", sports: "Sports", noSports: "No sports yet", noSportsCopy: "Start with any discipline—from gym training to swimming, running, or football.", createSport: "Create a sport",
    workouts: "Workouts", newWorkout: "New workout", noWorkouts: "No workouts here", noWorkoutsCopy: "Choose a sport and add its first workout.", createWorkout: "Create a workout", chooseWorkout: "Choose a workout", chooseWorkoutCopy: "Its exercises, instructions, images, and videos will appear here in training order.",
    trainingPlan: "Training plan", edit: "Edit", duplicate: "Duplicate", delete: "Delete", orderHint: "Use the arrows or drag cards to change the order.", addExercise: "Add exercise", noExercises: "No exercises yet", noExercisesCopy: "Add a free-form instruction or use the optional detail fields.", addFirstExercise: "Add first exercise",
    sport: "Sport", close: "Close", name: "Name", descriptionOptional: "Description (optional)", sportNamePlaceholder: "For example, Gym", sportDescriptionPlaceholder: "What do you use this sport for?", cancel: "Cancel", saveSport: "Save sport",
    workout: "Workout", workoutNamePlaceholder: "For example, Push Day", approxDuration: "Approx. duration", durationPlaceholder: "For example, 60 min", notesOptional: "Notes (optional)", saveWorkout: "Save workout",
    exercise: "Exercise", newExercise: "New exercise", exerciseName: "Exercise name", exerciseNamePlaceholder: "For example, Dumbbell Bench Press", freeDescription: "Free-form description", descriptionPlaceholder: "Write the exercise exactly as you prefer…", optionalDetails: "Optional details", sets: "Sets", repetitions: "Repetitions", weight: "Weight", distance: "Distance", duration: "Duration", rest: "Rest", intensity: "Intensity", instructions: "Instructions", saveExercise: "Save exercise",
    footerPrivacy: "Everything is processed and stored locally in this browser.", legal: "Trademark & copyright", aboutApp: "About the app", createFirstSport: "Create your first sport to begin.", selectSportFirst: "Choose or create a sport first.", selectWorkoutFirst: "Choose or create a workout first.",
    editSport: "Edit sport", deleteSport: "Delete sport", editWorkout: "Edit workout", duplicateWorkout: "Duplicate workout", deleteWorkout: "Delete workout", editExercise: "Edit exercise", duplicateExercise: "Duplicate exercise", deleteExercise: "Delete exercise", moveUp: "Move up", moveDown: "Move down",
    exercises: "exercises", workoutSingular: "workout", workoutPlural: "workouts", sportSingular: "sport", sportPlural: "sports", exerciseSingular: "exercise", exercisePlural: "exercises", approx: "Approx.", notes: "Notes", details: "Details", media: "Images & videos", addMedia: "Add media", replace: "Replace", remove: "Remove",
    confirmDeleteSport: "Delete this sport, all its workouts, exercises, images, and videos?", confirmDeleteWorkout: "Delete this workout and all its exercises, images, and videos?", confirmDeleteExercise: "Delete this exercise and its images and videos?", confirmDeleteMedia: "Remove this image or video?", confirmImport: "Importing a backup replaces the current library. Continue?",
    sportSaved: "Sport saved.", workoutSaved: "Workout saved.", exerciseSaved: "Exercise saved.", sportDuplicated: "Workout duplicated.", exerciseDuplicated: "Exercise duplicated.", deleted: "Deleted.", orderUpdated: "Exercise order updated.", mediaSaved: "Media saved locally.", mediaReplaced: "Media replaced.", backupReady: "Backup exported.", importComplete: "Backup imported.",
    unsupportedMedia: "Choose an image or video file.", fileTooLarge: "This file is larger than 250 MB.", storageError: "The browser could not save that file. Free some device storage and try again.", invalidBackup: "This is not a valid Training Atlas backup.", exportError: "The backup could not be created.",
    storageUsed: "used locally", storageUnavailable: "Local storage available", noDescription: "No description", unnamedMedia: "Media", loading: "Loading…", requiredName: "Add a name before saving.", copiedSuffix: "copy", footerLocal: "Local only"
  },
  pt: {
    description: "Organize desportos, treinos, exercícios, imagens e vídeos de forma privada neste dispositivo.", skip: "Saltar para o organizador", home: "Página inicial da EstrelaLuaApps", nav: "Navegação da aplicação", allApps: "Todas as apps", about: "Sobre",
    kicker: "Biblioteca privada de treinos", intro: "Crie qualquer desporto, organize os seus treinos e tenha cada exercício e demonstração prontos quando for treinar.", localTitle: "Guardado apenas neste dispositivo", localCopy: "Sem conta, envios, análises ou pedidos externos.",
    libraryTools: "Ferramentas da biblioteca", storageChecking: "A verificar armazenamento local…", export: "Exportar cópia", import: "Importar cópia", newSport: "Novo desporto", sports: "Desportos", noSports: "Ainda não existem desportos", noSportsCopy: "Comece por qualquer modalidade — ginásio, natação, corrida ou futebol.", createSport: "Criar desporto",
    workouts: "Treinos", newWorkout: "Novo treino", noWorkouts: "Ainda não existem treinos", noWorkoutsCopy: "Escolha um desporto e adicione o primeiro treino.", createWorkout: "Criar treino", chooseWorkout: "Escolha um treino", chooseWorkoutCopy: "Os exercícios, instruções, imagens e vídeos aparecem aqui pela ordem de execução.",
    trainingPlan: "Plano de treino", edit: "Editar", duplicate: "Duplicar", delete: "Eliminar", orderHint: "Use as setas ou arraste os cartões para alterar a ordem.", addExercise: "Adicionar exercício", noExercises: "Ainda não existem exercícios", noExercisesCopy: "Adicione uma descrição livre ou utilize os campos opcionais.", addFirstExercise: "Adicionar primeiro exercício",
    sport: "Desporto", close: "Fechar", name: "Nome", descriptionOptional: "Descrição (opcional)", sportNamePlaceholder: "Por exemplo, Ginásio", sportDescriptionPlaceholder: "Como utiliza este desporto?", cancel: "Cancelar", saveSport: "Guardar desporto",
    workout: "Treino", workoutNamePlaceholder: "Por exemplo, Push Day", approxDuration: "Duração aproximada", durationPlaceholder: "Por exemplo, 60 min", notesOptional: "Notas (opcional)", saveWorkout: "Guardar treino",
    exercise: "Exercício", newExercise: "Novo exercício", exerciseName: "Nome do exercício", exerciseNamePlaceholder: "Por exemplo, Dumbbell Bench Press", freeDescription: "Descrição livre", descriptionPlaceholder: "Escreva o exercício exatamente como preferir…", optionalDetails: "Detalhes opcionais", sets: "Séries", repetitions: "Repetições", weight: "Peso", distance: "Distância", duration: "Duração", rest: "Descanso", intensity: "Intensidade", instructions: "Instruções", saveExercise: "Guardar exercício",
    footerPrivacy: "Tudo é processado e guardado localmente neste navegador.", legal: "Marcas e direitos de autor", aboutApp: "Sobre a app", createFirstSport: "Crie o primeiro desporto para começar.", selectSportFirst: "Escolha ou crie primeiro um desporto.", selectWorkoutFirst: "Escolha ou crie primeiro um treino.",
    editSport: "Editar desporto", deleteSport: "Eliminar desporto", editWorkout: "Editar treino", duplicateWorkout: "Duplicar treino", deleteWorkout: "Eliminar treino", editExercise: "Editar exercício", duplicateExercise: "Duplicar exercício", deleteExercise: "Eliminar exercício", moveUp: "Mover para cima", moveDown: "Mover para baixo",
    exercises: "exercícios", workoutSingular: "treino", workoutPlural: "treinos", sportSingular: "desporto", sportPlural: "desportos", exerciseSingular: "exercício", exercisePlural: "exercícios", approx: "Aprox.", notes: "Notas", details: "Detalhes", media: "Imagens e vídeos", addMedia: "Adicionar multimédia", replace: "Substituir", remove: "Remover",
    confirmDeleteSport: "Eliminar este desporto e todos os treinos, exercícios, imagens e vídeos?", confirmDeleteWorkout: "Eliminar este treino e todos os exercícios, imagens e vídeos?", confirmDeleteExercise: "Eliminar este exercício e as respetivas imagens e vídeos?", confirmDeleteMedia: "Remover esta imagem ou vídeo?", confirmImport: "Importar uma cópia substitui a biblioteca atual. Continuar?",
    sportSaved: "Desporto guardado.", workoutSaved: "Treino guardado.", exerciseSaved: "Exercício guardado.", sportDuplicated: "Treino duplicado.", exerciseDuplicated: "Exercício duplicado.", deleted: "Eliminado.", orderUpdated: "Ordem dos exercícios atualizada.", mediaSaved: "Multimédia guardada localmente.", mediaReplaced: "Multimédia substituída.", backupReady: "Cópia exportada.", importComplete: "Cópia importada.",
    unsupportedMedia: "Escolha um ficheiro de imagem ou vídeo.", fileTooLarge: "Este ficheiro tem mais de 250 MB.", storageError: "O navegador não conseguiu guardar o ficheiro. Liberte espaço no dispositivo e tente novamente.", invalidBackup: "Esta não é uma cópia válida do Training Atlas.", exportError: "Não foi possível criar a cópia.",
    storageUsed: "utilizados localmente", storageUnavailable: "Armazenamento local disponível", noDescription: "Sem descrição", unnamedMedia: "Multimédia", loading: "A carregar…", requiredName: "Adicione um nome antes de guardar.", copiedSuffix: "cópia", footerLocal: "Apenas local"
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const now = () => new Date().toISOString();
const id = () => globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
const clean = (value, max = 2000) => String(value ?? "").trim().slice(0, max);
const emptyState = () => ({ version: 1, sports: [], workouts: [], exercises: [] });

let language = getLanguage();
let state = loadState();
let selectedSportId = state.sports[0]?.id || null;
let selectedWorkoutId = state.workouts.find((item) => item.sportId === selectedSportId)?.id || null;
let toastTimer;
let mediaTarget = null;
let draggedExerciseId = null;
let planRenderToken = 0;
const objectUrls = new Set();

const elements = {
  sportsList: $("#sports-list"), sportsEmpty: $("#sports-empty"), workoutsList: $("#workouts-list"), workoutsEmpty: $("#workouts-empty"), activeSportName: $("#active-sport-name"),
  planEmpty: $("#plan-empty"), planView: $("#plan-view"), planTitle: $("#plan-title"), planDescription: $("#plan-description"), planMeta: $("#plan-meta"), workoutNotes: $("#workout-notes"), exerciseCount: $("#exercise-count"), exerciseList: $("#exercise-list"), exercisesEmpty: $("#exercises-empty"),
  sportDialog: $("#sport-dialog"), sportForm: $("#sport-form"), sportDialogTitle: $("#sport-dialog-title"), workoutDialog: $("#workout-dialog"), workoutForm: $("#workout-form"), workoutDialogTitle: $("#workout-dialog-title"), exerciseDialog: $("#exercise-dialog"), exerciseForm: $("#exercise-form"), exerciseDialogTitle: $("#exercise-dialog-title"),
  mediaInput: $("#media-input"), toast: $("#toast"), summary: $("#summary-counts"), storage: $("#storage-status"), importInput: $("#import-backup")
};

function t(key) { return translations[language]?.[key] ?? translations.en[key] ?? key; }

function loadState() {
  try { return normaliseState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { return emptyState(); }
}

function normaliseState(input) {
  if (!input || typeof input !== "object") return emptyState();
  const sports = Array.isArray(input.sports) ? input.sports.map((item) => ({ id: clean(item.id, 100) || id(), name: clean(item.name, 60), description: clean(item.description, 300), createdAt: item.createdAt || now() })).filter((item) => item.name) : [];
  const sportIds = new Set(sports.map((item) => item.id));
  const workouts = Array.isArray(input.workouts) ? input.workouts.map((item) => ({ id: clean(item.id, 100) || id(), sportId: clean(item.sportId, 100), name: clean(item.name, 80), description: clean(item.description, 500), duration: clean(item.duration, 40), notes: clean(item.notes, 200), createdAt: item.createdAt || now() })).filter((item) => item.name && sportIds.has(item.sportId)) : [];
  const workoutIds = new Set(workouts.map((item) => item.id));
  const exercises = Array.isArray(input.exercises) ? input.exercises.map((item) => ({
    id: clean(item.id, 100) || id(), workoutId: clean(item.workoutId, 100), name: clean(item.name, 100), description: clean(item.description, 1000), sets: clean(item.sets, 30), reps: clean(item.reps, 40), weight: clean(item.weight, 40), distance: clean(item.distance, 40), duration: clean(item.duration, 40), rest: clean(item.rest, 40), intensity: clean(item.intensity, 80), instructions: clean(item.instructions, 1500), notes: clean(item.notes, 800), order: Number.isFinite(Number(item.order)) ? Number(item.order) : 0,
    media: Array.isArray(item.media) ? item.media.map((media) => ({ id: clean(media.id, 100), name: clean(media.name, 240), type: clean(media.type, 100), size: Number(media.size) || 0 })).filter((media) => media.id) : [], createdAt: item.createdAt || now()
  })).filter((item) => item.name && workoutIds.has(item.workoutId)) : [];
  return { version: 1, sports, workouts, exercises };
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { showToast(t("storageError"), true); }
  updateSummary();
}

function plural(count, singularKey, pluralKey) { return `${count} ${t(count === 1 ? singularKey : pluralKey)}`; }

function updateSummary() {
  elements.summary.textContent = [plural(state.sports.length, "sportSingular", "sportPlural"), plural(state.workouts.length, "workoutSingular", "workoutPlural"), plural(state.exercises.length, "exerciseSingular", "exercisePlural")].join(" · ");
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
  updateSummary();
  refreshStorage();
}

function createActionButton(label, symbol, action, itemId, className = "") {
  const button = document.createElement("button");
  button.type = "button"; button.dataset.action = action; button.dataset.id = itemId; button.className = className; button.textContent = symbol; button.setAttribute("aria-label", label); button.title = label;
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
    menu.append(createActionButton(t("editWorkout"), "✎", "edit-workout", workout.id), createActionButton(t("duplicateWorkout"), "⧉", "duplicate-workout", workout.id), createActionButton(t("deleteWorkout"), "×", "delete-workout", workout.id, "danger"));
    item.append(select, menu); elements.workoutsList.append(item);
  }
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
  const facts = [["sets", exercise.sets], ["repetitions", exercise.reps], ["weight", exercise.weight], ["distance", exercise.distance], ["duration", exercise.duration], ["rest", exercise.rest], ["intensity", exercise.intensity]].filter(([,value]) => value);
  if (facts.length) { const row = document.createElement("div"); row.className = "exercise-facts"; for (const [key,value] of facts) { const fact = document.createElement("span"); fact.textContent = `${t(key)}: ${value}`; row.append(fact); } main.append(row); }
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

function openSportDialog(sport = null) {
  resetForm(elements.sportForm); elements.sportDialogTitle.textContent = sport ? t("editSport") : t("newSport");
  if (sport) { elements.sportForm.elements.id.value = sport.id; elements.sportForm.elements.name.value = sport.name; elements.sportForm.elements.description.value = sport.description; }
  elements.sportDialog.showModal(); setTimeout(() => elements.sportForm.elements.name.focus(), 0);
}

function openWorkoutDialog(workout = null) {
  if (!selectedSportId) { showToast(t("selectSportFirst"), true); return; }
  resetForm(elements.workoutForm); elements.workoutDialogTitle.textContent = workout ? t("editWorkout") : t("newWorkout");
  if (workout) for (const key of ["id","name","description","duration","notes"]) elements.workoutForm.elements[key].value = workout[key] || "";
  elements.workoutDialog.showModal(); setTimeout(() => elements.workoutForm.elements.name.focus(), 0);
}

function openExerciseDialog(exercise = null) {
  if (!selectedWorkoutId) { showToast(t("selectWorkoutFirst"), true); return; }
  resetForm(elements.exerciseForm); elements.exerciseDialogTitle.textContent = exercise ? t("editExercise") : t("newExercise");
  if (exercise) for (const key of ["id","name","description","sets","reps","weight","distance","duration","rest","intensity","instructions","notes"]) elements.exerciseForm.elements[key].value = exercise[key] || "";
  elements.exerciseDialog.showModal(); setTimeout(() => elements.exerciseForm.elements.name.focus(), 0);
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
  if (existing) Object.assign(existing, { name: clean(values.name,80), description: clean(values.description,500), duration: clean(values.duration,40), notes: clean(values.notes,200) });
  else { const workout = { id: id(), sportId: selectedSportId, name: clean(values.name,80), description: clean(values.description,500), duration: clean(values.duration,40), notes: clean(values.notes,200), createdAt: now() }; state.workouts.push(workout); selectedWorkoutId = workout.id; }
  saveState(); elements.workoutDialog.close(); render(); showToast(t("workoutSaved"));
}

function handleExerciseSubmit(event) {
  event.preventDefault(); if (!elements.exerciseForm.reportValidity()) return;
  const values = formValues(elements.exerciseForm); const existing = state.exercises.find((item) => item.id === values.id);
  const fields = { name: clean(values.name,100), description: clean(values.description,1000), sets: clean(values.sets,30), reps: clean(values.reps,40), weight: clean(values.weight,40), distance: clean(values.distance,40), duration: clean(values.duration,40), rest: clean(values.rest,40), intensity: clean(values.intensity,80), instructions: clean(values.instructions,1500), notes: clean(values.notes,800) };
  if (existing) Object.assign(existing, fields);
  else { const current = state.exercises.filter((item) => item.workoutId === selectedWorkoutId); state.exercises.push({ id: id(), workoutId: selectedWorkoutId, ...fields, order: current.length, media: [], createdAt: now() }); }
  saveState(); elements.exerciseDialog.close(); render(); showToast(t("exerciseSaved"));
}

async function deleteExerciseAndMedia(exerciseId) {
  const exercise = state.exercises.find((item) => item.id === exerciseId);
  if (!exercise) return;
  await Promise.allSettled(exercise.media.map((media) => deleteMedia(media.id)));
  state.exercises = state.exercises.filter((item) => item.id !== exerciseId);
}

async function deleteWorkoutAndChildren(workoutId) {
  const exerciseIds = state.exercises.filter((item) => item.workoutId === workoutId).map((item) => item.id);
  for (const exerciseId of exerciseIds) await deleteExerciseAndMedia(exerciseId);
  state.workouts = state.workouts.filter((item) => item.id !== workoutId);
}

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
  if (action === "select-sport") { selectedSportId = itemId; selectedWorkoutId = state.workouts.find((item) => item.sportId === itemId)?.id || null; return render(); }
  if (action === "select-workout") { selectedWorkoutId = itemId; return render(); }
  if (action === "edit-sport") return openSportDialog(state.sports.find((item) => item.id === itemId));
  if (action === "edit-workout") return openWorkoutDialog(state.workouts.find((item) => item.id === (itemId || selectedWorkoutId)));
  if (action === "edit-exercise") return openExerciseDialog(state.exercises.find((item) => item.id === itemId));
  if (action === "duplicate-workout") return duplicateWorkout(itemId || selectedWorkoutId);
  if (action === "duplicate-exercise") { const clone = await duplicateExercise(itemId); if (clone) { saveState(); render(); showToast(t("exerciseDuplicated")); } return; }
  if (action === "move-up") return moveExercise(itemId,-1);
  if (action === "move-down") return moveExercise(itemId,1);
  if (action === "add-media" || action === "replace-media") { mediaTarget = { exerciseId: itemId, replaceId: target.dataset.mediaId || null }; elements.mediaInput.multiple = action === "add-media"; elements.mediaInput.value = ""; elements.mediaInput.click(); return; }
  if (action === "remove-media") return removeMediaItem(itemId,target.dataset.mediaId);
  if (action === "delete-exercise") { if (!confirm(t("confirmDeleteExercise"))) return; await deleteExerciseAndMedia(itemId); saveState(); render(); showToast(t("deleted")); return; }
  if (action === "delete-workout") { const workoutId = itemId || selectedWorkoutId; if (!confirm(t("confirmDeleteWorkout"))) return; await deleteWorkoutAndChildren(workoutId); if (selectedWorkoutId === workoutId) selectedWorkoutId = null; saveState(); render(); showToast(t("deleted")); return; }
  if (action === "delete-sport") { if (!confirm(t("confirmDeleteSport"))) return; const workoutIds = state.workouts.filter((item) => item.sportId === itemId).map((item) => item.id); for (const workoutId of workoutIds) await deleteWorkoutAndChildren(workoutId); state.sports = state.sports.filter((item) => item.id !== itemId); if (selectedSportId === itemId) { selectedSportId = null; selectedWorkoutId = null; } saveState(); render(); showToast(t("deleted")); }
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
  const exercise = state.exercises.find((item) => item.id === exerciseId); if (!exercise) return;
  try { await deleteMedia(mediaId); } catch {}
  exercise.media = exercise.media.filter((item) => item.id !== mediaId); saveState(); renderPlan(); refreshStorage(); showToast(t("deleted"));
}

function blobToDataUrl(blob) { return new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(reader.error); reader.readAsDataURL(blob); }); }
function dataUrlToBlob(dataUrl) { const [header,data] = String(dataUrl).split(","); if (!header || !data) throw new Error("Invalid data URL"); const type = /data:([^;]+)/.exec(header)?.[1] || "application/octet-stream"; const binary = atob(data); const bytes = new Uint8Array(binary.length); for (let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i); return new Blob([bytes],{type}); }

async function exportBackup() {
  try {
    const records = await getAllMedia(); const media = [];
    for (const record of records) media.push({ id: record.id, exerciseId: record.exerciseId, name: record.name, type: record.type, size: record.size, createdAt: record.createdAt, data: await blobToDataUrl(record.blob) });
    const payload = { app: "training-atlas", version: 1, exportedAt: now(), library: state, media };
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
  render();
}

document.addEventListener("click", (event) => { const target = event.target.closest("[data-action]"); if (target) handleAction(target.dataset.action,target); });
$("#new-sport").addEventListener("click", () => openSportDialog());
$("#new-sport-small").addEventListener("click", () => openSportDialog());
$("#new-workout").addEventListener("click", () => openWorkoutDialog());
elements.sportForm.addEventListener("submit",handleSportSubmit);
elements.workoutForm.addEventListener("submit",handleWorkoutSubmit);
elements.exerciseForm.addEventListener("submit",handleExerciseSubmit);
for (const dialog of [elements.sportDialog,elements.workoutDialog,elements.exerciseDialog]) for (const button of $$('button[value="cancel"]',dialog)) button.addEventListener("click",(event) => { event.preventDefault(); dialog.close(); });
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
