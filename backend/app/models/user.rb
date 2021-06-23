class User < ApplicationRecord
  has_secure_password
  has_many :meals

  validates :username, uniqueness: true, presence: true
  validates :age, :weight, :gender, :height, presence: true
end
