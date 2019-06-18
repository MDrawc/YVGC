class User < ApplicationRecord
  before_save { email.downcase! }

  has_many :collections, dependent: :destroy

  VALID_EMAIL_FORMAT = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255},
   format: { with: VALID_EMAIL_FORMAT }, uniqueness: { case_sensitive: false }

  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
end