// note: This file contains the models for the database tables.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// User model
class User extends Model {}
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    hashed_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_type: {
      type: DataTypes.ENUM('student', 'tutor'),
      allowNull: false,
      defaultValue: 'student',
    },
    total_tutoring_hours: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totp_secret: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Users' }
);

// Tutors model
class Tutor extends Model {}
Tutor.init(
  {
    tutor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    about_me: DataTypes.TEXT,
    profile_picture: DataTypes.STRING(255),
    is_criminal: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: 'Tutors' }
);

// Subjects model
class Subject extends Model {}
Subject.init(
  {
    subject_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Subjects' }
);

// Tutor_Subjects model
class Tutor_Subject extends Model {}
Tutor_Subject.init(
  {
    tutor_subject_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tutor,
        key: 'tutor_id',
      },
    },
    subject_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject,
        key: 'subject_id',
      },
    },
  },
  { sequelize, modelName: 'Tutor_Subjects' }
);

// Scheduled Appointments model
class Scheduled_Appointments extends Model {}
Scheduled_Appointments.init(
  {
    appointment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tutor,
        key: 'tutor_id',
      },
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    meeting_title: DataTypes.STRING(255),
    meeting_desc: DataTypes.TEXT,
  },
  { sequelize, modelName: 'Scheduled_Appointments' }
);

// Favorites model
class Favorite extends Model {}
Favorite.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
      primaryKey: true,
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tutor,
        key: 'tutor_id',
      },
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'Favorites' }
);

// Tutor_Availability model
class Tutor_Availability extends Model {}
Tutor_Availability.init(
  {
    tutor_availability_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tutor,
        key: 'tutor_id',
      },
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tutor_Availability',
    tableName: 'Tutor_Availability',
  }
);

// Associations
User.hasOne(Tutor, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Tutor.belongsTo(User, {
  foreignKey: 'user_id',
});

Tutor.belongsToMany(Subject, {
  through: Tutor_Subject,
  foreignKey: 'tutor_id',
});

Subject.belongsToMany(Tutor, {
  through: Tutor_Subject,
  foreignKey: 'subject_id',
});

User.belongsToMany(Tutor, {
  through: 'Favorites',
  foreignKey: 'student_id',
  otherKey: 'tutor_id',
});

Tutor.belongsToMany(User, {
  through: 'Favorites',
  foreignKey: 'tutor_id',
  otherKey: 'student_id',
});

Tutor.hasMany(Tutor_Availability, {
  foreignKey: 'tutor_id',
  onDelete: 'CASCADE',
});

Tutor_Availability.belongsTo(Tutor, {
  foreignKey: 'tutor_id',
});

User.hasMany(Scheduled_Appointments, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE',
});

Tutor.hasMany(Scheduled_Appointments, {
  foreignKey: 'tutor_id',
  onDelete: 'CASCADE',
});

Scheduled_Appointments.belongsTo(User, {
  foreignKey: 'student_id',
});

Scheduled_Appointments.belongsTo(Tutor, {
  foreignKey: 'tutor_id',
});

User.hasMany(Favorite, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE',
});

Tutor.hasMany(Favorite, {
  foreignKey: 'tutor_id',
  onDelete: 'CASCADE',
});

Favorite.belongsTo(User, {
  foreignKey: 'student_id',
});

Favorite.belongsTo(Tutor, {
  foreignKey: 'tutor_id',
});

module.exports = {
  User,
  Tutor,
  Subject,
  Tutor_Subject,
  Scheduled_Appointments,
  Favorite,
  Tutor_Availability,
};
