import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../modules/categories/schemas/category.schema';
import { SubCategory } from '../../modules/categories/schemas/sub-category.schema';

/**
 * CategoriesSeedService is responsible for populating the database with
 * initial categories and sub-categories if none exist.
 * 
 * Lifecycle:
 * - Implements OnModuleInit, so it runs automatically when the NestJS module
 *   is initialized.
 * - Checks if any categories already exist; if so, it does nothing.
 * - Otherwise, it creates a predefined set of main categories and sub-categories.
 */
@Injectable()
export class CategoriesSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,

    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategory>,
  ) {}

  /**
   * Called automatically by NestJS on module initialization.
   * Seeds categories and sub-categories if the database is empty.
   */
  async onModuleInit() {
    const categoriesCount = await this.categoryModel.countDocuments();

    if (categoriesCount > 0) {
      // Database already has categories, skip seeding
      return;
    }

    // Create main categories
    const programming = await this.categoryModel.create({ name: 'Programming' });
    const databases = await this.categoryModel.create({ name: 'Databases' });
    const design = await this.categoryModel.create({ name: 'Design' });
    const business = await this.categoryModel.create({ name: 'Business' });
    const science = await this.categoryModel.create({ name: 'Science' });
    const arts = await this.categoryModel.create({ name: 'Arts' });
    const languages = await this.categoryModel.create({ name: 'Languages' });
    const sports = await this.categoryModel.create({ name: 'Sports' });
    const music = await this.categoryModel.create({ name: 'Music' });
    const personalDevelopment = await this.categoryModel.create({ name: 'Personal Development' });
    const other = await this.categoryModel.create({ name: 'Other' });

    // Create sub-categories and associate them with their parent category
    await this.subCategoryModel.insertMany([
      // Programming
      { name: 'JavaScript', category_id: programming._id },
      { name: 'Python', category_id: programming._id },
      { name: 'Java', category_id: programming._id },
      { name: 'C#', category_id: programming._id },
      { name: 'C++', category_id: programming._id },
      { name: 'Rust', category_id: programming._id },
      { name: 'Go', category_id: programming._id },
      { name: 'Ruby', category_id: programming._id },
      { name: 'TypeScript', category_id: programming._id },
      { name: 'Kotlin', category_id: programming._id },
      { name: 'Other', category_id: programming._id },

      // Databases
      { name: 'MongoDB', category_id: databases._id },
      { name: 'PostgreSQL', category_id: databases._id },
      { name: 'MySQL', category_id: databases._id },
      { name: 'Redis', category_id: databases._id },
      { name: 'SQLite', category_id: databases._id },
      { name: 'Oracle DB', category_id: databases._id },
      { name: 'Cassandra', category_id: databases._id },
      { name: 'DynamoDB', category_id: databases._id },
      { name: 'MariaDB', category_id: databases._id },
      { name: 'Elasticsearch', category_id: databases._id },
      { name: 'Other', category_id: databases._id },

      // Design
      { name: 'Graphic Design', category_id: design._id },
      { name: 'UI/UX', category_id: design._id },
      { name: 'Web Design', category_id: design._id },
      { name: 'Typography', category_id: design._id },
      { name: 'Motion Graphics', category_id: design._id },
      { name: 'Illustration', category_id: design._id },
      { name: '3D Design', category_id: design._id },
      { name: 'Photography', category_id: design._id },
      { name: 'Branding', category_id: design._id },
      { name: 'Color Theory', category_id: design._id },
      { name: 'Other', category_id: design._id },

      // Business
      { name: 'Marketing', category_id: business._id },
      { name: 'Finance', category_id: business._id },
      { name: 'Entrepreneurship', category_id: business._id },
      { name: 'Leadership', category_id: business._id },
      { name: 'Management', category_id: business._id },
      { name: 'Sales', category_id: business._id },
      { name: 'HR', category_id: business._id },
      { name: 'Strategy', category_id: business._id },
      { name: 'Operations', category_id: business._id },
      { name: 'Project Management', category_id: business._id },
      { name: 'Other', category_id: business._id },

      // Science
      { name: 'Physics', category_id: science._id },
      { name: 'Chemistry', category_id: science._id },
      { name: 'Biology', category_id: science._id },
      { name: 'Astronomy', category_id: science._id },
      { name: 'Geology', category_id: science._id },
      { name: 'Mathematics', category_id: science._id },
      { name: 'Psychology', category_id: science._id },
      { name: 'Ecology', category_id: science._id },
      { name: 'Neuroscience', category_id: science._id },
      { name: 'Robotics', category_id: science._id },
      { name: 'Other', category_id: science._id },

      // Arts
      { name: 'Painting', category_id: arts._id },
      { name: 'Sculpture', category_id: arts._id },
      { name: 'Drawing', category_id: arts._id },
      { name: 'Film', category_id: arts._id },
      { name: 'Photography', category_id: arts._id },
      { name: 'Dance', category_id: arts._id },
      { name: 'Theater', category_id: arts._id },
      { name: 'Architecture', category_id: arts._id },
      { name: 'Ceramics', category_id: arts._id },
      { name: 'Calligraphy', category_id: arts._id },
      { name: 'Other', category_id: arts._id },

      // Languages
      { name: 'English', category_id: languages._id },
      { name: 'Spanish', category_id: languages._id },
      { name: 'French', category_id: languages._id },
      { name: 'German', category_id: languages._id },
      { name: 'Chinese', category_id: languages._id },
      { name: 'Japanese', category_id: languages._id },
      { name: 'Russian', category_id: languages._id },
      { name: 'Arabic', category_id: languages._id },
      { name: 'Hebrew', category_id: languages._id },
      { name: 'Italian', category_id: languages._id },
      { name: 'Other', category_id: languages._id },

      // Sports
      { name: 'Football', category_id: sports._id },
      { name: 'Basketball', category_id: sports._id },
      { name: 'Tennis', category_id: sports._id },
      { name: 'Swimming', category_id: sports._id },
      { name: 'Running', category_id: sports._id },
      { name: 'Cycling', category_id: sports._id },
      { name: 'Yoga', category_id: sports._id },
      { name: 'Martial Arts', category_id: sports._id },
      { name: 'Gymnastics', category_id: sports._id },
      { name: 'Skiing', category_id: sports._id },
      { name: 'Other', category_id: sports._id },

      // Music
      { name: 'Rock', category_id: music._id },
      { name: 'Pop', category_id: music._id },
      { name: 'Jazz', category_id: music._id },
      { name: 'Classical', category_id: music._id },
      { name: 'Hip-Hop', category_id: music._id },
      { name: 'Electronic', category_id: music._id },
      { name: 'Country', category_id: music._id },
      { name: 'Reggae', category_id: music._id },
      { name: 'Blues', category_id: music._id },
      { name: 'Folk', category_id: music._id },
      { name: 'Other', category_id: music._id },

      // Personal Development
      { name: 'Productivity', category_id: personalDevelopment._id },
      { name: 'Mindfulness', category_id: personalDevelopment._id },
      { name: 'Leadership', category_id: personalDevelopment._id },
      { name: 'Career', category_id: personalDevelopment._id },
      { name: 'Motivation', category_id: personalDevelopment._id },
      { name: 'Time Management', category_id: personalDevelopment._id },
      { name: 'Communication Skills', category_id: personalDevelopment._id },
      { name: 'Emotional Intelligence', category_id: personalDevelopment._id },
      { name: 'Self-Confidence', category_id: personalDevelopment._id },
      { name: 'Decision Making', category_id: personalDevelopment._id },
      { name: 'Other', category_id: personalDevelopment._id },

      // Other
      { name: 'Other', category_id: other._id },
    ]);

  }
}
