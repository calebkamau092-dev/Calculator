let state = "idle";
const submitForm = document.querySelector("#form");
submitForm.addEventListener("submit", searchWord);

function searchWord(event) {
  event.preventDefault();
  setState("loading");
  const word = document.getElementById("search-input").value;
  const output = document.getElementById("container");
  const error = document.getElementById("error");

  error.hidden = true;
  output.innerHTML = "";

  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(function (data) {
      setState("success");
      const entry = data[0];
      const output = document.getElementById("container");

      let card = document.createElement("div");
      card.className = "card";

      let title = document.createElement("h2");
      title.className = "word";
      title.textContent = entry.word;

      card.appendChild(title);

      entry.meanings.forEach(function (meaning) {
        let section = document.createElement("div");
        section.style.marginTop = "10px";

        let pos = document.createElement("h3");
        pos.textContent = meaning.partOfSpeech;
        pos.style.color = "#5F4A8B";

        section.appendChild(pos);

        let def = document.createElement("p");
        def.textContent = "Definition: " + meaning.definitions[0].definition;
        section.appendChild(def);

        let ex = document.createElement("p");

        if (meaning.definitions[0].example) {
          ex.textContent = "Example: " + meaning.definitions[0].example;
        } else {
          ex.textContent = "Example: Not available";
        }

        section.appendChild(ex);

        card.appendChild(section);
      });

      output.appendChild(card);
    })
    .catch(function (err) {
      setState("error");

      const error = document.getElementById("error");
      error.textContent = "Word not found. Try again.";
    });
}
function setState(newState) {
  state = newState;

  const error = document.getElementById("error");

  if (state === "loading") {
    error.hidden = false;
    error.textContent = "Searching...";
  }

  if (state === "error") {
    error.hidden = false;
  }

  if (state === "success" || state === "idle") {
    error.hidden = true;
    error.textContent = "";
  }
}
