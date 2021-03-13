const get_data = async () => {
  let arr = [];
  let container;
  try {
    const response = await fetch("https://api.npoint.io/d6bd0efc05639084eb17/");
    const g = await response.json();
    // console.log(g);

    container = document.querySelector(".cards-container");
    for (let i = 0; i < g.playerList.length; i++) {
      try {
        arr.push({
          id: g.playerList[i].Id,
          pfname: g.playerList[i].PFName,
          tname: g.playerList[i].TName,
          skill: g.playerList[i].SkillDesc,
          next_match: g.playerList[i].UpComingMatchesList[0].MDate,
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }

  arr.sort((a, b) => {
    return a.pfname < b.pfname ? -1 : 1;
  });

  for (let i = 0; i < arr.length; i++) {
    try {
      let card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = `./player-images/${arr[i].id}.jpg`;

      card.appendChild(img);
      // console.log(card);
      const desc = document.createElement("div");
      desc.className = "desc";

      const pfname = document.createElement("div");
      pfname.className = "pfname";
      pfname.textContent = "Name: " + arr[i].pfname;
      desc.appendChild(pfname);

      const skill = document.createElement("div");
      skill.className = "skill";
      skill.textContent = "Skill: " + arr[i].skill;
      desc.appendChild(skill);

      const tname = document.createElement("div");
      tname.className = "tname";
      tname.textContent = "Team: " + arr[i].tname;
      desc.appendChild(tname);

      const next_match = document.createElement("div");
      next_match.className = "next_match";
      next_match.textContent =
        "Next Match Date: " + new Date(arr[i].next_match).toLocaleDateString();
      desc.appendChild(next_match);
      card.appendChild(desc);
      container.appendChild(card);
    } catch (err) {
      console.log(err);
    }
  }

  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => e.preventDefault());
  const input = document.querySelector("#search");
  // console.log(input);

  let is_results = Array(container.children.length).fill(true);
  console.log(is_results);
  input.addEventListener("keyup", (e) => {
    // console.log(container);
    for (let i = 0; i < container.children.length; i++) {
      const curr_card = container.children[i];
      let curr_pfname = curr_card
        .querySelector(".pfname")
        .innerText.toLowerCase();

      const curr_tname = curr_card
        .querySelector(".tname")
        .innerText.toLowerCase();

      if (
        curr_pfname.indexOf(e.target.value.toLowerCase()) === -1 &&
        curr_tname.indexOf(e.target.value.toLowerCase()) === -1
      ) {
        curr_card.style.display = "none";
        is_results[i] = false;
      } else {
        curr_card.style.display = "block";
        is_results[i] = true;
      }
    }

    const element = document.querySelector(".no_results");
    const check = is_results.some((x) => x === true);
    if (!check) {
      element.innerText = "No result found with this query";
    } else {
      element.innerText = "";
    }
  });
};

get_data();
