# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_14_184826) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "date_time", null: false
    t.float "duration", null: false
    t.text "description", null: false
    t.string "online", default: "no", null: false
    t.string "venue"
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date_time"], name: "index_events_on_date_time"
    t.index ["group_id"], name: "index_events_on_group_id"
    t.index ["title"], name: "index_events_on_title"
  end

  create_table "group_keywords", force: :cascade do |t|
    t.bigint "keyword_id", null: false
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id", "keyword_id"], name: "index_group_keywords_on_group_id_and_keyword_id", unique: true
    t.index ["group_id"], name: "index_group_keywords_on_group_id"
    t.index ["keyword_id"], name: "index_group_keywords_on_keyword_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "member_label"
    t.string "location", null: false
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location"], name: "index_groups_on_location"
    t.index ["name"], name: "index_groups_on_name", unique: true
    t.index ["owner_id"], name: "index_groups_on_owner_id"
  end

  create_table "keywords", force: :cascade do |t|
    t.string "keyword"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["keyword"], name: "index_keywords_on_keyword", unique: true
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_memberships_on_group_id"
    t.index ["member_id"], name: "index_memberships_on_member_id"
  end

  create_table "signups", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "attendee_id", null: false
    t.string "rsvp_status", default: "going", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attendee_id"], name: "index_signups_on_attendee_id"
    t.index ["event_id", "attendee_id"], name: "index_signups_on_event_id_and_attendee_id", unique: true
    t.index ["event_id"], name: "index_signups_on_event_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "location", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "events", "groups"
  add_foreign_key "group_keywords", "groups"
  add_foreign_key "group_keywords", "keywords"
  add_foreign_key "groups", "users", column: "owner_id"
  add_foreign_key "memberships", "groups"
  add_foreign_key "memberships", "users", column: "member_id"
  add_foreign_key "signups", "events"
  add_foreign_key "signups", "users", column: "attendee_id"
end
