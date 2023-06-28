$('img').each((_, img) => {

    if ($(img).attr('id') === 'image-preview-content') {
        let isShown = true;

        $(img).click(() => {
            const hasTitle = $('#image-preview-title').text().length > 0;
            isShown = !isShown;
            if (isShown && hasTitle) {
                $('#image-preview-title').show();
            } else {
                $('#image-preview-title').hide();
            }
        });

        return;
    }

    $(img).css('cursor', 'pointer');
    $(img).click(() => {
        $('body').css('overflow', 'hidden');
        $('#image-preview-container').show();
        $('#image-preview-content')
            .attr('src', $(img).attr('src'));

        if ($(img).attr('alt')) {
            $('#image-preview-title')
                .text($(img).attr('alt'))
                .show();
        } else {
            $('#image-preview-title').hide();
        }
    });
});

$('#image-preview-dismiss-section').click(() => {
    $('body').css('overflow', 'auto');
    $('#image-preview-container').hide();
    $('#image-preview-content').attr('src', '');
    $('#image-preview-title').text('');
});
