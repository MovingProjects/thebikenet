const openSociodemoBtn = document.getElementById("open-sociodemo-btn");
const submitSociodemo = document.getElementById("submit-sociodemo");
const cancelSociodemo = document.getElementById("cancel-sociodemo");
const questionsContainer = document.getElementById("sociodemo-questions");

let allSections = [];
let currentSectionIndex = 0;
let sociodemoResponses = {};

// Open sociodemo and load JSON
openSociodemoBtn.addEventListener("click", () => {
  fetch("db_mock/sociodemo.json")
    .then((res) => res.json())
    .then((data) => {
      allSections = data.sections;
      currentSectionIndex = 0;
      sociodemoResponses = {};
      showScreen("sociodemo-screen");
      renderCurrentSection();
    })
    .catch((err) => console.error("Error loading questionnaire:", err));
});

// Cancel action
cancelSociodemo.addEventListener("click", () => {
  showScreen("profile-screen");
});

// Render the current section
function renderCurrentSection() {
  questionsContainer.innerHTML = "";

  const section = allSections[currentSectionIndex];

  const sectionDiv = document.createElement("div");
  sectionDiv.className = "questionnaire-section";

  const title = document.createElement("h3");
  title.textContent = section.title
    .replace(/profile\.\d+-/i, "")
    .replace(/-/g, " ");
  sectionDiv.appendChild(title);

  section.questions.forEach((question) => {
    const block = document.createElement("div");
    block.className = "question-block";

    const label = document.createElement("label");
    label.textContent = question.text;
    block.appendChild(label);

    const qid = question.question_id || question.id;

    if (question.question_type === "single_option") {
      const select = document.createElement("select");
      select.name = qid;

      question.options.forEach((opt) => {
        const option = document.createElement("option");
        option.value = opt.text;
        option.textContent = opt.text;
        select.appendChild(option);
      });

      block.appendChild(select);
    } else if (question.question_type === "multiple_options") {
      question.options.forEach((opt) => {
        const wrapper = document.createElement("div");
        wrapper.className = "checkbox-wrapper";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = qid;
        input.value = opt.text;

        const span = document.createElement("span");
        span.textContent = opt.text;

        wrapper.appendChild(input);
        wrapper.appendChild(span);
        block.appendChild(wrapper);
      });
    } else if (question.question_type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.name = qid;
      block.appendChild(input);
    }

    sectionDiv.appendChild(block);
  });

  questionsContainer.appendChild(sectionDiv);
  renderNavButtons();
}

// Save current section responses
function collectResponses() {
  const inputs = questionsContainer.querySelectorAll("input, select");

  inputs.forEach((input) => {
    const id = input.name;

    if (input.type === "checkbox") {
      if (!sociodemoResponses[id]) sociodemoResponses[id] = [];
      if (input.checked && !sociodemoResponses[id].includes(input.value)) {
        sociodemoResponses[id].push(input.value);
      }
    } else {
      sociodemoResponses[id] = input.value;
    }
  });
}

// Render navigation buttons
function renderNavButtons() {
  const navDiv = document.createElement("div");
  navDiv.className = "nav-buttons";

  if (currentSectionIndex > 0) {
    const backBtn = document.createElement("button");
    backBtn.textContent = "Indietro";
    backBtn.className = "btn-secondary";
    backBtn.onclick = () => {
      collectResponses();
      currentSectionIndex--;
      renderCurrentSection();
    };
    navDiv.appendChild(backBtn);
  }

  if (currentSectionIndex < allSections.length - 1) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Avanti";
    nextBtn.className = "btn-primary";
    nextBtn.onclick = () => {
      collectResponses();
      currentSectionIndex++;
      renderCurrentSection();
    };
    navDiv.appendChild(nextBtn);
  } else {
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Salva";
    finishBtn.className = "btn-primary";
    finishBtn.onclick = () => {
      collectResponses();

      const stored = localStorage.getItem("firestore_profile");
      if (stored) {
        const profile = JSON.parse(stored);
        profile.sociodemo = sociodemoResponses;
        localStorage.setItem("firestore_profile", JSON.stringify(profile));
        console.log("🧠 Sociodemo responses saved");
      }

      showScreen("profile-screen");
    };
    navDiv.appendChild(finishBtn);
  }

  questionsContainer.appendChild(navDiv);
}
