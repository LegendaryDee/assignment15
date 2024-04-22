

document.addEventListener("DOMContentLoaded", () => {
    const craftsList = document.getElementById("crafts-list");

    // Fetch 
    fetch("./api/crafts")
        .then(response => response.json())
        .then(crafts => {
            crafts.forEach(craft => {
                const craftCard = document.createElement("div");
                craftCard.classList.add("craft-card");

                const img = document.createElement("img");
                img.src = craft.img;
                img.alt = craft.name;
                

                img.addEventListener("click", () => {
                    const modal = document.getElementById("myModal");
                    const modalContent = document.querySelector(".modal-content");
                    const modalTitle = document.getElementById("modal-title");
                    const modalDescription = document.getElementById("modal-description");
                    const modalSupplies = document.getElementById("modal-supplies");
                    const modalImage = document.getElementById("modal-image");

                    modalTitle.textContent = craft.name;
                    modalDescription.textContent = craft.description;

                    modalSupplies.innerHTML = "";

                    craft.supplies.forEach(supply => {
                        const listItem = document.createElement("li");
                        listItem.textContent = supply;
                        modalSupplies.appendChild(listItem);
                    });

                    modalImage.src = `http://localhost:3000/api/crafts${craft.image}`;

                    modal.style.display = "block";
                });

                craftCard.appendChild(img);

                craftsList.appendChild(craftCard);
            });
        })
        .catch(error => console.error("Error fetching crafts data:", error));
        eLink.onclick = (e) => {
            e.preventDefault();
            document.querySelector(".dialog").classList.remove("transparent");
            document.getElementById("add-edit-title").innerHTml = "Edit Craft";
        };
        
        dLink.onclick = (e) => {
            e.preventDefault();
            
        };
        populateEditForm(craft);
    });
        function populateEditForm(craft) { }

        const addEditCraft = async (e) => {
        e.preventDefault();

        const form = document.getElementById("add-edit-craft-form");
        const formData = new FormData(form);
        formData.append("supplies", getSupplies());

        let response;

        if(form._id.value == -1) {
            formData.delete("_id");
            
            response = await fetch("/api/crafts",{
                method: "POST",
                body: formData,
            });
        }

        if(response.status != 200){
            console.log("Error contacting server");
            return;
        }
        };

        document.querySelector(".dialog").classList.add("transparent");
        resetForm();
        showCrafts();

        const getSupplies = () => {
            const inputs = document.querySelectorAll("#supply-boxes input");
            const supplies = [];

            inputs.forEach((input) => {
            supplies.push(input.value);
            console.log("value" + input.value);
            });
            return supplies;
        }
           
        const resetForm = () => {
        const form = document.getElementById("add-edit-craft-form");
        form.reset();
        form._id = "-1";
        document.getElementById("supply-boxes").innerHTML = "";
        };

        const showHideAdd = (e) => {
            e.preventDefault();
            document.querySelector(".dialog").classList.remove("transparent");
            document.getElementById("add-edit-title").innerHTML = "Add Craft";
            resetForm();

        }

        const addCraft = (e)=> {
            e.preventDefault();
            console.log("adding craft")
        };

        window.onload = () => {
            showCrafts();
            document.getElementById("add-edit-craft-form").onsubmit = addEditCraft;
            document.getElementById("add-link").onclick = showHideAdd;

            document.querySelector(".close").onclick = () => {
                document.querySelector(".dialog").classList.add("transparent");
            };

            document.getElementById("add-suppliy").onclick = addSupply;
        }

    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };





















        


    


   

  
    

