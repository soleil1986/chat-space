$(document).on("turbolinks:load",
  function(){
  var interval = setInterval(function() {
    var messageId = $('.main__body__messages:last').attr('message_id');
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: messageId },
        dataType: 'json'
      })
      .done(function(json){
        if (json.length !== 0){
        var insertHTML = '';
        json.messages.forEach(function(messages){
          insertHTML += buildHTML(message);
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages').get(0).scrollHeight },'slow');
      }
       })
      .fail(function(data){
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    };
  } , 5000);

  function buildHTML(message){
    var image = ""
    if (message.image != null) {
      image = `<img src = ${message.image} class='main2__image'>`
    }
    var html = `<div class="main__body__messages" message_id=${ message.id }>
                  <div class="main__message">
                    <div class="main__message__name">
                      ${ message.user_name }
                    </div>
                    <div class="main__message__date">
                      ${ message.created_at }
                    </div>
                    <div class="main__message__body">
                      ${ message.body }
                    </div>
                  </div>
                  <div class="main2__message">
                      <p class="main2__body">
                      </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.form__submit').prop("disabled", false);
    })
   .fail(function(){
      alert('エラーが発生しました');
    })
  });
});
