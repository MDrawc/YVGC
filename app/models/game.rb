class Game < ApplicationRecord
  scope :igdb, -> (igdb_id) { where(igdb_id: igdb_id) }
  scope :sort_by_added_asc, lambda { joins(:collection_games).order('collection_games.created_at ASC') }
  scope :sort_by_added_desc, lambda { joins(:collection_games).order('collection_games.created_at DESC') }

  validates :name, presence: true

  validates :igdb_id, presence: true, uniqueness: {scope: [:platform, :physical] }

  # validates :platform, presence: { message: 'Select platform'}, if: :needs_platform?

  validate :platform_presence, if: :needs_platform?

  # validates :platform, absence: { message: 'Platform should not be indicated'}, unless: :needs_platform?

  validates :physical, inclusion: { in: [true, false], message: 'Select game\'s format'}, if: :needs_platform?
  validates :physical, inclusion: { in: [nil], message: 'Game\'s format should not be indicated'}, unless: :needs_platform?

  has_many :collection_games, dependent: :destroy
  has_many :collections, through: :collection_games

  has_many :developer_games, dependent: :destroy
  has_many :developers, through: :developer_games

  ransack_alias :name_dev, :name_or_developers_name
  ransack_alias :plat, :platform_name

  def needs_platform
    needs_platform == true
  end

  def platform_presence
    errors.add(:select, 'platform') if platform.blank?
  end

  amoeba do
    enable
    include_association :developer_games
  end
end
