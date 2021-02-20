class Meal < ApplicationRecord
  has_many :meal_foods
  has_many :foods, through: :meal_foods

  accepts_nested_attributes_for :meal_foods, reject_if: proc { |attributes| attributes['amount'] <= 0 }

  #how does this callback workk??
  # before_save :switch_to_int
  # private
  # def switch_to_int(record)
  #   byebug
  # end

end
