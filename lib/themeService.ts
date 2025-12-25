import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6949246e002f720eb299');

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
const COLLECTION_ID = 'theme_settings';

export type ThemeType = 
  | 'normal' 
  | 'christmas' 
  | 'halloween' 
  | 'dashain' 
  | 'tihar' 
  | 'holi' 
  | 'teej'
  | 'losar'
  | 'newYear';

export interface ThemeSettings {
  $id?: string;
  theme: ThemeType;
  updatedAt: string;
}

class ThemeService {
  private readonly SETTINGS_DOC_ID = 'current_theme';

  async getCurrentTheme(): Promise<ThemeType> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('$id', this.SETTINGS_DOC_ID)]
      );

      if (response.documents.length > 0) {
        return response.documents[0].theme as ThemeType;
      }

      return 'normal';
    } catch (error) {
      console.error('Failed to get current theme:', error);
      return 'normal';
    }
  }

  async updateTheme(theme: ThemeType): Promise<void> {
    try {
      const existing = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('$id', this.SETTINGS_DOC_ID)]
      );

      const data = {
        theme,
        updatedAt: new Date().toISOString(),
      };

      if (existing.documents.length > 0) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          this.SETTINGS_DOC_ID,
          data
        );
      } else {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          this.SETTINGS_DOC_ID,
          data
        );
      }
    } catch (error) {
      console.error('Failed to update theme:', error);
      throw error;
    }
  }
}

export const themeService = new ThemeService();
