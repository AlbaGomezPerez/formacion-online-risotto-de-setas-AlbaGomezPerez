'use strict';



const test = document.querySelector('.buy-container');

    window.onload = function() {
        const ingredients= [
            {
                score: 19.180931,
                show: {
                    id: 431,
                    url: "http://www.tvmaze.com/shows/431/friends",
                    name: "Friends",
                    type: "Scripted",
                    language: "English",
                    genres: [
                        "Comedy",
                        "Romance"
                    ],
                    status: "Ended",
                    runtime: 30,
                    premiered: "1994-09-22",
                    officialSite: null,
                    schedule: {
                        time: "20:00",
                        days: [
                            "Thursday"
                        ]
                    },
                }];

   // recorrer ingredients (map) y pintar en el espacio
        return (
            { indredients.map (item => {
                    return (
                        console.log(item.show.name);
                        // test.innerHTML = item.recipe
                    )
                })}
        )



            // for (let i = 0; i < data.length; i++) {
                // variable que hace referencia al id, el name y la imagen.
                // let serieInfo = {
                //     id: data[i].show.id,
                //     name: data[i].show.name,
                // };
                // }
};