const base_url = "https://api.thecatapi.com/v1";
const end_point = "/breeds"
const end_point_two = "/images/search"
const api_key = "live_3vZ932cA3h4VazEOwxEEC0YV5LIOFsUTwToRXNlwal9kDv6iW9m3OXoEc1LpZPrR";


export function fetchBreeds() {
    return fetch(`${base_url}${end_point}?api_key=${api_key}`)
        .then(response => {
            console.log(response);
           if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
};

export function fetchCatByBreed(breedId) {
    return fetch(`${base_url}${end_point_two}?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
        console.log(response);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
};
