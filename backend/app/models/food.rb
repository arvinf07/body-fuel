class Food < ApplicationRecord
  belongs_to :meal

  validates :name, uniqueness: true
end
