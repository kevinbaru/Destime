var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";

mongoose.connect(connect);

var favoriteSchema = mongoose.Schema({
  travel: [String],
  film: [String],
  tv: [String],
  music: [String],
  theatre: [String],
  books: [String],
  mags: [String],
  brands: [String],
  celebs: [String],
  apps: [String]
});

var professionalsSchema = mongoose.Schema({
  companyWorked: [{
    companyName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  }],
  schooling: [{
    schoolName: {
      type: String,
      required: true
    },
    major: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    }
  }],
  influencers: [String],
  groups: [String],
  connections_amount: {
    type: Number,
    min: 0,
    required: true
  }
});

var useSurveySchema = mongoose.Schema({
  selflessness_rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  personality_rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  work_ethic_rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  creativity_rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  bravery_rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  socially_rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  hobbies_rate: {
    type: Number,
    min: 1,
    max: 5
  },
  decision_rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  facebookID: String,
  facebookToken: String,
  fbrefreshToken: String,
  pictureURL: String,
  friends: Object,
  twitterID: String,
  twitterToken: String,
  twitterTokenSecret: String,
  followers: Object,
  googleID: String,
  pictureURL: String,
  gGtoken: String,
  gGrefreshToken: String,
  linkedinID: String,
  lntoken: String,
  lnrefreshtoken: String,
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  ifMaster: {
    type: Boolean,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  universityOrCompany: {
    type: Boolean,
    required: true
  },
  capital: String,
  website: String,
  blog: String,
  github: String,
  favorite: {
    type: favoriteSchema,
    required: true
  },
  professionals: [{
    type: professionalsSchema,
    required: true
  }],
  user_survey: {
    type: useSurveySchema,
    required: true
  },
  skill_set: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    }],
    reuired: true
  },
  product_team: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    }],
    reuired: true
  },
  product_set: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }],
    reuired: true
  },
  destime: {
    destime_name: {
      type: String,
      required: true
    },
    goals: {
      type: String,
      required: true
    },
    sameIndustryOrNot: {
      type: Boolean,
      required: true
    }
  },
  essence: {
    type: [String],
    enum: ['Friendly', 'Visionary', 'Theoretical', 'Fast Paced', 'Competent',
             'Adaptable', 'Stylish', 'Creative', 'Reserved', 'Laid Back', 'Lover',
             'Fighter', 'Responsible', 'Idealistic', 'Doer', 'Chivalrous', 'Heroic',
             'Brave', 'Honorable', 'Dependable', 'Hard Working', 'Goal Oriented',
             'Task Master', 'Intuitive', 'Entrepreneurial', 'Crafty', 'Analytical',
             'WYSIWYG', 'Loyal', 'Kind', 'Dutiful', 'Selfless', 'Perceptive',
             'Devoted', 'Observant', 'Conscientious', 'Leader', 'Open-Minded',
             'Performer', 'Gifted', 'Musical', 'Thespian', 'Original', 'Well-Rounded',
             'Tenacious', 'Determined', 'Persistent', 'Assertive', 'Outspoken',
             'Artsy', 'Peaceful', 'Athletic', 'Traditional', 'Practical', 'Knowledgable',
             'Blessed', 'Quick', 'Funny', 'Opinionated', 'Optimistic', 'Cautious'],
    required: true,
    validate: {
      validator: function essenceValidator(val) {
        return val.length == 5;
      }
    }
  },
  userReview: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  user_title: {
    type: [String],
    enum: ['The Duty Fulfiller', 'The Mechanic', 'The Nurturer', 'The Artist',
           'The Protector', 'The Idealist', 'The Scientist', 'The Thinker',
           'The Performer', 'The Caregiver', 'The Inspirer', 'The Doer',
           'The Guardian', 'The Giver', 'The Visionary', 'The Executive'],
    reuired: true,
    validate: function titleValidator(val) {
      return val.length == 5 ;
    }
  }
});



userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
