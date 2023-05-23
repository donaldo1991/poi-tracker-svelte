
<!-- reference: https://cloudinary.com/blog/guest_post/how-to-create-a-carousel-in-3-ways-in-svelte -->
<script>
    import Carousel from "svelte-carousel";
    const images = [
        {
            url: "https://res.cloudinary.com/ddtvdhhlm/image/upload/v1684785004/c0vas78ldxkpvfdwkaqp.jpg",
            description: "image1",
        },
        {
            url: "https://res.cloudinary.com/ddtvdhhlm/image/upload/v1684841036/dziwyyszqsfkkvt9pb9a.jpg",
            description: "image2",
        },
        {
            url: "https://res.cloudinary.com/ddtvdhhlm/image/upload/v1684841022/mjaiquscu5lv9eybvjcb.jpg",
            description: "image3",
        },
        {
            url: "https://res.cloudinary.com/ddtvdhhlm/image/upload/v1679481859/e9wizzjaastx0yvcvsoh.jpg",
            description: "image4",
        },
        {
            url: "https://res.cloudinary.com/ddtvdhhlm/image/upload/v1684784986/tzcifuerauun0799qcu5.png",
            description: "image5",
        },
    ];
    let carousel; // for calling methods of the carousel instance
    const handleNextClick = () => {
        carousel.goToNext();
    };
</script>

<Carousel
        bind:this={carousel}
        let:loaded
        autoplay
        autoplayDuration={3000}
        autoplayProgressVisible
>
    {#each images as src, imageIndex (src)}
        <div class="img-container">
            {#if loaded.includes(imageIndex)}
                <img src={src.url} alt={src.description} width={800} height={800} />
            {/if}
        </div>
    {/each}
</Carousel>