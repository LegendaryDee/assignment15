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
    craftImage.src = craft.img;

    craftImage.onclick = () => {
        const overlay = document.getElementById("area");
        const modalDiv = document.getElementById("craftModal");
        modalDiv.innerHTML = "";
        const btnWrap = document.createElement("p");
        btnWrap.id = "btn-wrap";

        const closeBtn = document.createElement("btn");
        closeBtn.onclick = () => {
            overlay.classList.add("hidden");
            modalDiv.classList.add("hidden");
        };


        closeBtn.innerHTML = "X";
        btnWrap.append(closeBtn);
        modalDiv.append(btnWrap);


        const flexDiv = document.createElement("div");
        flexDiv.id = "flex-div";
        const imgDiv= document.createElement("div");
        const flexImage = document.createElement("img");
        flexImage.src =  craft.img;
        imgDiv.append(flexImage);


        const contentDiv = document.createElement("div");
        const craftH2= document.createElement("h2");
        craftH2.innerHTML = craft.name;
        contentDiv.append(craftH2);


        const descriptionP = document.createElement("p");
        descriptionP.innerHTML = craft.description;
        contentDiv.append(descriptionP);


        const craftH3= document.createElement("h3");
        craftH3.innerHTML = "Supplies:";
        contentDiv.append(craftH3);


        const list = document.createElement("ul");
        craft.supplies.forEach((supply) => {
            const item = document.createElement("li");
            item.innerHTML = supply;
            list.appendChild(item);
        });

        contentDiv.append(list);
        flexDiv.append(imgDiv);
        flexDiv.append(contentDiv);
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
        craftDiv.innerHTML = "Crafts not aviable!";
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

const changeImgPreview = (event) => {
    const changePreview = document.getElementById("preview");
    if (!event.target.files.length) {
        changePreview.src = "https://place-hold.it/200x300";
        return;
    }
    changePreview.src = URL.createObjectURL(event.target.files.item(0));
};

const addSupply = (event) => {
    event.preventDefault();
    const suppliesList = document.getElementById("suppliesList");
    const supplyInput = document.createElement("input");
    supplyInput.type = "text";
    supplyInput.classList.add("supplyInput"); 
    suppliesList.appendChild(supplyInput);
};

const resetCraftForm = () => {
    document.getElementById("craftForm").reset();
    document.getElementById("suppliesList").innerHTML = "";
    document.getElementById("preview").src = "https://place-hold.it/200x300";
};

const openAddCraftModal = () => {
    resetCraftForm();
    const overlay = document.getElementById("overlay");
    const modalDiv = document.getElementById("craftModal");
    overlay.classList.remove("hidden");
    modalDiv.classList.remove("hidden");
};

const closeAddCraftModal = () => {
    const overlay = document.getElementById("overlay");
    const modalDiv = document.getElementById("craftModal");
    overlay.classList.add("hidden");
    modalDiv.classList.add("hidden");
    resetCraftForm();
};

const getSuppliesList = () => {
    const suppliesInput = document.querySelectorAll("#suppliesList input");
    const supplies = [];
    suppliesInput.forEach((supply) => {
        supplies.push(supply.value);
    });
    return supplies;
};

const submitCraftForm = async (event) => {
    event.preventDefault();
    const form = document.getElementById("craftForm");
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
document.getElementById("craftForm").onsubmit = submitCraftForm;
document.getElementById("addSupply").onclick = addSupply;
document.getElementById("img").onchange = changeImgPreview;
document.getElementById("cancel").onclick = closeAddCraftModal;