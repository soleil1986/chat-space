# README

## Chat-spaceデータベース設計

### messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|references: user|null: false, foreign_key: true|
|group_id|references: group|null: false, foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group

### usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|e-mail|string|null: false, unique: true|

#### Association
- has_many :messages
- has_many :group_users
- has_many :groups, through: :group_users

### groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|

#### Association
- has_many :messages
- has_many :group_users
- has_many :users, through: :group_users

### groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references: user|null: false, foreign_key: true|
|group_id|references: group|null: false, foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group


