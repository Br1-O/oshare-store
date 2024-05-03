//fetch and display a list into container when DOMloaded
export const fetchAndDisplay = (route, callbackForDisplay, container, elementsName) => {
    //load list into container when loaded
    document.addEventListener('DOMContentLoaded', async () => {

        try {
            const response = await fetch(route, { 
                method:'GET',
                headers: {
                    'content-type': 'application/json'    
                }
            });

            if (!response.ok) {
                throw new Error("Couldn't retrieve list of" + elementsName);
            }
        
            const res = await response.json();

            const dataList = res.data[elementsName]; 

            callbackForDisplay(dataList, container);

        } catch (error) {
            console.log("An error happened fetching the list of " + elementsName, error);
        }

    });
}


