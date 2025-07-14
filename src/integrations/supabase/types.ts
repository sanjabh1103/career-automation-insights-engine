export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ab_tests: {
        Row: {
          created_at: string
          id: string
          prompt_a: string
          prompt_b: string
          response_a: string | null
          response_b: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          votes_a: number | null
          votes_b: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          prompt_a: string
          prompt_b: string
          response_a?: string | null
          response_b?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          votes_a?: number | null
          votes_b?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          prompt_a?: string
          prompt_b?: string
          response_a?: string | null
          response_b?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          votes_a?: number | null
          votes_b?: number | null
        }
        Relationships: []
      }
      ai_analysis: {
        Row: {
          analysis_type: string
          anatomical_structures: Json | null
          confidence_score: number | null
          created_at: string
          educational_content: string | null
          id: string
          image_id: string | null
          learning_points: Json | null
          results: Json
        }
        Insert: {
          analysis_type?: string
          anatomical_structures?: Json | null
          confidence_score?: number | null
          created_at?: string
          educational_content?: string | null
          id?: string
          image_id?: string | null
          learning_points?: Json | null
          results?: Json
        }
        Update: {
          analysis_type?: string
          anatomical_structures?: Json | null
          confidence_score?: number | null
          created_at?: string
          educational_content?: string | null
          id?: string
          image_id?: string | null
          learning_points?: Json | null
          results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ai_analysis_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "medical_images"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          image_id: string | null
          is_active: boolean | null
          session_data: Json
          session_title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_id?: string | null
          is_active?: boolean | null
          session_data?: Json
          session_title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_id?: string | null
          is_active?: boolean | null
          session_data?: Json
          session_title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "medical_images"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          id: string
          rating: number | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          rating?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          rating?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      content_validation: {
        Row: {
          content: string
          created_at: string | null
          id: number
          model_name: string
          user_id: string | null
          validation: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          model_name: string
          user_id?: string | null
          validation?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          model_name?: string
          user_id?: string | null
          validation?: Json | null
        }
        Relationships: []
      }
      custom_models: {
        Row: {
          category: string
          complexity_score: number
          created_at: string
          description: string
          example: string
          id: string
          is_public: boolean | null
          name: string
          prompt_template: string
          updated_at: string
          use_cases: string[] | null
          user_id: string
        }
        Insert: {
          category: string
          complexity_score: number
          created_at?: string
          description: string
          example: string
          id?: string
          is_public?: boolean | null
          name: string
          prompt_template: string
          updated_at?: string
          use_cases?: string[] | null
          user_id: string
        }
        Update: {
          category?: string
          complexity_score?: number
          created_at?: string
          description?: string
          example?: string
          id?: string
          is_public?: boolean | null
          name?: string
          prompt_template?: string
          updated_at?: string
          use_cases?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      enhanced_solutions: {
        Row: {
          alternative_approaches: string | null
          created_at: string | null
          id: string
          is_ai_enhanced: boolean | null
          model_id: number
          potential_pitfalls: string | null
          problem_id: number
          reasoning_process: string | null
          solution_text: string
          success_metrics: string | null
          user_rating: number | null
        }
        Insert: {
          alternative_approaches?: string | null
          created_at?: string | null
          id?: string
          is_ai_enhanced?: boolean | null
          model_id: number
          potential_pitfalls?: string | null
          problem_id: number
          reasoning_process?: string | null
          solution_text: string
          success_metrics?: string | null
          user_rating?: number | null
        }
        Update: {
          alternative_approaches?: string | null
          created_at?: string | null
          id?: string
          is_ai_enhanced?: boolean | null
          model_id?: number
          potential_pitfalls?: string | null
          problem_id?: number
          reasoning_process?: string | null
          solution_text?: string
          success_metrics?: string | null
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_solutions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enhanced_solutions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enhanced_solutions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_assessments: {
        Row: {
          assessment_type: string
          completed_at: string | null
          created_at: string
          id: string
          image_id: string | null
          questions: Json
          score: number | null
          time_spent: number | null
          user_answers: Json | null
          user_id: string | null
        }
        Insert: {
          assessment_type?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          image_id?: string | null
          questions?: Json
          score?: number | null
          time_spent?: number | null
          user_answers?: Json | null
          user_id?: string | null
        }
        Update: {
          assessment_type?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          image_id?: string | null
          questions?: Json
          score?: number | null
          time_spent?: number | null
          user_answers?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_assessments_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "medical_images"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_images: {
        Row: {
          body_part: string | null
          created_at: string
          description: string | null
          file_size: number | null
          file_type: string
          file_url: string | null
          id: string
          metadata: Json | null
          modality: string | null
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          body_part?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_type: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          modality?: string | null
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          body_part?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          modality?: string | null
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      mental_models: {
        Row: {
          category: string
          category_rank: number | null
          complexity_score: number | null
          created_at: string | null
          description: string
          examples: Json | null
          id: number
          key_principles: Json | null
          last_used: string | null
          name: string
          overall_rank: number | null
          prompt_template: string
          rating_count: number | null
          related_models: Json | null
          success_rate: number | null
          tags: string[] | null
          updated_at: string | null
          usage_count: number | null
          use_cases: Json | null
        }
        Insert: {
          category: string
          category_rank?: number | null
          complexity_score?: number | null
          created_at?: string | null
          description: string
          examples?: Json | null
          id?: number
          key_principles?: Json | null
          last_used?: string | null
          name: string
          overall_rank?: number | null
          prompt_template: string
          rating_count?: number | null
          related_models?: Json | null
          success_rate?: number | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          use_cases?: Json | null
        }
        Update: {
          category?: string
          category_rank?: number | null
          complexity_score?: number | null
          created_at?: string | null
          description?: string
          examples?: Json | null
          id?: number
          key_principles?: Json | null
          last_used?: string | null
          name?: string
          overall_rank?: number | null
          prompt_template?: string
          rating_count?: number | null
          related_models?: Json | null
          success_rate?: number | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          use_cases?: Json | null
        }
        Relationships: []
      }
      model_recommendations: {
        Row: {
          created_at: string | null
          expected_outcome: string | null
          id: string
          model_id: number
          problem_id: number
          reasoning: string
          recommendation_rank: number
          relevance_score: number
        }
        Insert: {
          created_at?: string | null
          expected_outcome?: string | null
          id?: string
          model_id: number
          problem_id: number
          reasoning: string
          recommendation_rank: number
          relevance_score: number
        }
        Update: {
          created_at?: string | null
          expected_outcome?: string | null
          id?: string
          model_id?: number
          problem_id?: number
          reasoning?: string
          recommendation_rank?: number
          relevance_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "model_recommendations_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_recommendations_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_recommendations_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      model_usage_stats: {
        Row: {
          avg_rating: number | null
          category_rank: number | null
          id: string
          last_used: string | null
          model_id: number
          overall_rank: number | null
          success_rate: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          avg_rating?: number | null
          category_rank?: number | null
          id?: string
          last_used?: string | null
          model_id: number
          overall_rank?: number | null
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          avg_rating?: number | null
          category_rank?: number | null
          id?: string
          last_used?: string | null
          model_id?: number
          overall_rank?: number | null
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "model_usage_stats_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_usage_stats_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
        ]
      }
      problems: {
        Row: {
          complexity_score: number | null
          created_at: string | null
          domain: string | null
          estimated_impact: string | null
          expertise_level: string | null
          id: number
          problem_statement: string
          problem_type: string | null
          stakeholders: string[] | null
          time_constraint: string | null
          updated_at: string | null
          urgency: string | null
          user_id: string | null
        }
        Insert: {
          complexity_score?: number | null
          created_at?: string | null
          domain?: string | null
          estimated_impact?: string | null
          expertise_level?: string | null
          id?: number
          problem_statement: string
          problem_type?: string | null
          stakeholders?: string[] | null
          time_constraint?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Update: {
          complexity_score?: number | null
          created_at?: string | null
          domain?: string | null
          estimated_impact?: string | null
          expertise_level?: string | null
          id?: number
          problem_statement?: string
          problem_type?: string | null
          stakeholders?: string[] | null
          time_constraint?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      recommendation_feedback: {
        Row: {
          created_at: string | null
          feedback_text: string | null
          id: string
          model_id: number
          problem_id: number
          rating: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          model_id: number
          problem_id: number
          rating: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          model_id?: number
          problem_id?: number
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_feedback_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_feedback_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_feedback_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_prompts: {
        Row: {
          complexity: number | null
          created_at: string | null
          id: string
          include_examples: boolean | null
          is_public: boolean | null
          mental_model: string | null
          prompt_text: string
          scenario: string | null
          title: string
          tone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          complexity?: number | null
          created_at?: string | null
          id?: string
          include_examples?: boolean | null
          is_public?: boolean | null
          mental_model?: string | null
          prompt_text: string
          scenario?: string | null
          title: string
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          complexity?: number | null
          created_at?: string | null
          id?: string
          include_examples?: boolean | null
          is_public?: boolean | null
          mental_model?: string | null
          prompt_text?: string
          scenario?: string | null
          title?: string
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      solution_comparisons: {
        Row: {
          compared_models: Json
          comparison_data: Json
          created_at: string | null
          id: string
          problem_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          compared_models?: Json
          comparison_data?: Json
          created_at?: string | null
          id?: string
          problem_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          compared_models?: Json
          comparison_data?: Json
          created_at?: string | null
          id?: string
          problem_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          id: string
          interaction_data: Json | null
          interaction_type: string | null
          session_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          interaction_data?: Json | null
          interaction_type?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          interaction_data?: Json | null
          interaction_type?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          language: string | null
          learning_level: string | null
          notification_settings: Json | null
          specialty_focus: string[] | null
          ui_theme: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          language?: string | null
          learning_level?: string | null
          notification_settings?: Json | null
          specialty_focus?: string[] | null
          ui_theme?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          language?: string | null
          learning_level?: string | null
          notification_settings?: Json | null
          specialty_focus?: string[] | null
          ui_theme?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string | null
          events: string[] | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      mental_model_analytics: {
        Row: {
          avg_feedback_rating: number | null
          category: string | null
          category_rank: number | null
          feedback_count: number | null
          id: number | null
          name: string | null
          overall_rank: number | null
          recommendation_count: number | null
          success_rate: number | null
          usage_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_top_models_for_dropdown: {
        Args: { filter_category?: string; model_limit?: number }
        Returns: {
          id: number
          name: string
          category: string
          description: string
          complexity_score: number
          success_rate: number
          usage_count: number
          overall_rank: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
