json.messages @new_messages.each do |message|
 json.user_name  message.user.name
 json.date  message.created_at
 json.body  message.body
 json.image message.image.url
 json.id  message.id
end
