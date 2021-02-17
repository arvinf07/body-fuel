class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :name
      t.float :calories
      t.float :fat
      t.float :carb
      t.float :protein

      t.timestamps
    end
  end
end
