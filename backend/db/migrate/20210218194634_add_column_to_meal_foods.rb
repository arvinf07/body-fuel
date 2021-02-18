class AddColumnToMealFoods < ActiveRecord::Migration[6.1]
  def change
    add_column :meal_foods, :amount, :string
  end
end
