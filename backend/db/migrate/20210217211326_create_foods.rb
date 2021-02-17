class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :name
      t.integer :calories
      t.integer :fat
      t.integer :carb
      t.integer :protein
      t.integer :meal_id

      t.timestamps
    end
  end
end
