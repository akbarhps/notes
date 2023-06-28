const markdownIt = window.markdownit({html: true, linkify: true});

const url = new URL(window.location);
const urlSplit = url.pathname.split('/');
const postId = urlSplit[urlSplit.length - 1];

async function getPostById(id) {
    const res = await fetch(`/api/v1/posts/${postId}`);
    return await res.json();
}

function setContentMetadata(metadata) {
    document.title = metadata['title'];
    $("link[rel~='icon']").attr('href', getFileUrl(metadata['favicon_url']));

    $('#meta-date').text(metadata['date']);
    $('#meta-title').text(metadata['title']);
    $('#meta-description').text(metadata['description']);
    // $('#meta-sender').text(metadata['sender']);
    // $('#meta-recipient').text(metadata['recipient']);

    // if (!metadata['thumbnail_url']) {
    //     $('#meta-thumbnail').hide();
    // } else {
    //     $('#meta-thumbnail')
    //         .attr('src', getFileUrl(metadata['thumbnail_url']))
    //         .attr('title', metadata['title']);
    // }
}


(async () => {
    const result = await getPostById(postId)
    console.log(result);
    // const metadataPath = metadataPathCode[letterCode[0]];
    // const resMeta = await get(getFileUrl(metadataPath));
    // const metadata = await resMeta[letterCode];
    // setContentMetadata(metadata);
    //
    // const resMarkdown = await fetch(getFileUrl(metadata['file_path']));
    // const markdownText = await resMarkdown.text();
    // $('#letter-body').html(markdownIt.render(markdownText));

    // const script = document.createElement('script');
    // script.src = 'imagepreview.js';
    // document.head.appendChild(script);
})();