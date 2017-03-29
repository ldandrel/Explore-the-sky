function Constellation (id) {
console.log(id);
// Instanciate request
    var xhr = new XMLHttpRequest();

// Ready stage change callback
    xhr.onreadystatechange = function()
    {
        // Is done
        if( xhr.readyState === XMLHttpRequest.DONE )
        {
            // Success
            if(xhr.status === 200)
            {
                var result = JSON.parse( xhr.responseText );
                console.log( 'success' );
                console.log( result );
            }
            else
            {
                console.log( 'error' );
            }
        }
    };

// Open request
    xhr.open("GET", "api/constellations/?id="+ id,true);
// Send request
    xhr.send();
}

Constellation(12);
