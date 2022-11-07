window.addEventListener("DOMContentLoaded", function () {
    var initDaysplit = function (data) {
        const daySplit = document.querySelector('#numecogestes-daysplit');
        var hourDiv, squareDiv, pElement;
        if (!daySplit) {
            return;
        }

        data.values.forEach(function (item) {
            hourDiv = document.createElement('div');
            hourDiv.className = "fr-col daysplit__item";
            hourDiv.id = "col-" + item.pas + "h";

            squareDiv = document.createElement('div');
            squareDiv.classList.add("daysplit__item__square");
            if (item.hvalue === 3) {
                squareDiv.classList.add("daysplit__item__square--alert");
            } else if (item.hvalue === 2) {
                squareDiv.classList.add("daysplit__item__square--warning");
            } else if (8 <= item.pas && item.pas < 13 || 18 <= item.pas && item.pas < 20) {
                squareDiv.classList.add("daysplit__item__square--high");
            }

            hourDiv.appendChild(squareDiv);

            if (item.pas % 2 === 0) {
                pElement = document.createElement('p');
                pElement.textContent = item.pas + "h";
                hourDiv.appendChild(pElement);
            }

            daySplit.appendChild(hourDiv);
        });
    };

    chrome.storage.local.get("signals").then(function (data) {
        var now = new Date(),
            isoDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}-${now.getDate().toString().padStart(2, 0)}`;
        const currentDay = data.signals.signals.find(item => {
            return item.jour.indexOf(isoDate) !== -1;
        });

        if (currentDay) {
            initDaysplit(currentDay);
        }
    });
});
