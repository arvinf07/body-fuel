class User < ApplicationRecord
  has_secure_password
  has_many :meals

  validates :username, uniqueness: true, presence: true
  validates :age, :weight, :gender, :height, presence: true

  before_create :create_meals

  def create_meals
    meal_names = ["Breakfast", "Lunch", "Dinner", "Snacks"]
    meal_names.each{ |name| self.meals.build(name: name)}
  end
end
