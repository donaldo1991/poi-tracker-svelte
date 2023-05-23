<!-- reference: https://cloudinary.com/blog/guest_post/implement-an-image-carousel-in-svelte -->

<script>
    import {onMount} from 'svelte';

    let widget;

    onMount(() => {
        if ('cloudinary' in window) {
            widget = window.cloudinary.createUploadWidget({
                cloudName: 'ddtvdhhlm',
                uploadPreset: 'xkz9fc2c'
            }, (error, result) => {
                console.log(result)
            });
        }
    });

    function handleClick(){
        if(widget){
            widget.open()
        }
    }

</script>

<button on:click|preventDefault={handleClick}>Upload Image to Cloudinary</button>