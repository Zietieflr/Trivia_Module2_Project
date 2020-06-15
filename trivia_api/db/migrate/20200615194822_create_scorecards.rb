class CreateScorecards < ActiveRecord::Migration[6.0]
  def change
    create_table :scorecards do |t|
      t.string :category
      t.string :difficulty
      t.float :correct
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
