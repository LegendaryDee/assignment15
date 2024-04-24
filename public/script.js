

const getCrafts = async () => {
    try {
        return (await fetch("./api/crafts")).json();
    } catch (error) {
        console.log(error);
        return "";
    }
};

const getCraft = (craft) => {
    const craftImage = document.createElement("img");
    craftImage.src = "/images/" + craft.img;

    craftImage.onclick = () => {
        const overlay = document.getElementById("craft-area");
        const modalDiv = document.getElementById("craft-modal");
        modalDiv.innerHTML = "";
        const buttonWrap = document.createElement("p");
        buttonWrap.id = "btn-wrap";
        const closeButton = document.createElement("button");
        closeButton.onclick = () => {
            overlay.classList.add("hidden");
            modalDiv.classList.add("hidden");
        };
        closeButton.innerHTML = "X";
        buttonWrap.append(closeButton);
        modalDiv.append(buttonWrap);
        const flexDiv = document.createElement("div");
        flexDiv.id = "flex-div";
        const imgDiv= document.createElement("div");
        const flexImage = document.createElement("img");
        flexImage.src = "./images/" + craft.img;
        imgDiv.append(flexImage);
        const textDivElement = document.createElement("div");
        const craftH2Element = document.createElement("h2");
        craftH2Element.innerHTML = craft.name;
        textDivElement.append(craftH2Element);
        const descPElement = document.createElement("p");
        descPElement.innerHTML = craft.description;
        textDivElement.append(descPElement);
        const craftH3Element = document.createElement("h3");
        craftH3Element.innerHTML = "Supplies:";
        textDivElement.append(craftH3Element);
        const listElement = document.createElement("ul");
        craft.supplies.forEach((supply) => {
            const itemElement = document.createElement("li");
            itemElement.innerHTML = supply;
            listElement.appendChild(itemElement);
        });
        textDivElement.append(listElement);
        flexDiv.append(imgDiv);
        flexDiv.append(textDivElement);
        modalDiv.append(flexDiv);
        overlay.classList.remove("hidden");
        modalDiv.classList.remove("hidden");
    };
    return craftImage;
};

const showCrafts = async () => {
    const craftsJSON = await getCrafts();
    const craftDiv = document.getElementById("crafts");
    craftDiv.innerHTML = "";
    if (craftsJSON == "") {
        craftDiv.innerHTML = "no crafts here";
        return;
    }
    let count = 0;
    let column = document.createElement("div");
    column.classList.add("column");
    craftsJSON.forEach((craft) => {
        column.append(getCraft(craft));
        count++;
        if (count > 6) {
            craftDiv.append(column);
            column = document.createElement("div");
            column.classList.add("column");
            count = 0;
        }
    });
    craftDiv.append(column);
};

const changeImagePreview = (event) => {
    const previewElement = document.getElementById("preview");
    if (!event.target.files.length) {
        previewElement.src = "https://place-hold.it/200x300";
        return;
    }
    previewElement.src = URL.createObjectURL(event.target.files.item(0));
};

const addSupplyInput = (event) => {
    event.preventDefault();
    const suppliesListElement = document.getElementById("supplies-list");
    const supplyInputElement = document.createElement("input");
    supplyInputElement.type = "text";
    supplyInputElement.classList.add("supply-input"); 
    suppliesListElement.appendChild(supplyInputElement);
};

const resetCraftForm = () => {
    document.getElementById("craft-form").reset();
    document.getElementById("supplies-list").innerHTML = "";
    document.getElementById("preview").src = "https://place-hold.it/200x300";
};

const openAddCraftModal = () => {
    resetCraftForm();
    const overlay = document.getElementById("craft-add-overlay");
    const modalDiv = document.getElementById("add-craft-modal");
    overlay.classList.remove("hidden");
    modalDiv.classList.remove("hidden");
};

const closeAddCraftModal = () => {
    const overlay = document.getElementById("craft-add-overlay");
    const modalDiv = document.getElementById("add-craft-modal");
    overlay.classList.add("hidden");
    modalDiv.classList.add("hidden");
    resetCraftForm();
};

const getSuppliesList = () => {
    const suppliesInput = document.querySelectorAll("#supplies-list input");
    const supplies = [];
    suppliesInput.forEach((supply) => {
        supplies.push(supply.value);
    });
    return supplies;
};

const submitCraftForm = async (event) => {
    event.preventDefault();
    const form = document.getElementById("craft-form");
    const formData = new FormData(form);
    formData.append("supplies", getSuppliesList().join(","));
    const response = await fetch("/api/crafts", {
        method: "POST",
        body: formData
    });
    const result = await response.json();
    if (result.error) {
        console.log(result.error);
        return;
    }
    closeAddCraftModal();
    showCrafts();
};


showCrafts();
document.getElementById("addCraft").onclick = openAddCraftModal;
document.getElementById("craft-form").onsubmit = submitCraftForm;
document.getElementById("add-supply").onclick = addSupplyInput;
document.getElementById("img").onchange = changeImagePreview;
document.getElementById("cancel").onclick = closeAddCraftModal;