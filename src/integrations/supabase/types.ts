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
      agents: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          project_id: string | null
          role: string
          system_prompt: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          project_id?: string | null
          role: string
          system_prompt: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          project_id?: string | null
          role?: string
          system_prompt?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agricultural_profiles: {
        Row: {
          created_at: string | null
          farming_experience: number | null
          farming_method: string | null
          id: string
          irrigation_access: boolean | null
          land_ownership: string | null
          land_size: number | null
          last_season_yield: Json | null
          primary_crops: string[]
          soil_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          farming_experience?: number | null
          farming_method?: string | null
          id?: string
          irrigation_access?: boolean | null
          land_ownership?: string | null
          land_size?: number | null
          last_season_yield?: Json | null
          primary_crops?: string[]
          soil_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          farming_experience?: number | null
          farming_method?: string | null
          id?: string
          irrigation_access?: boolean | null
          land_ownership?: string | null
          land_size?: number | null
          last_season_yield?: Json | null
          primary_crops?: string[]
          soil_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agricultural_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
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
      ai_conversations: {
        Row: {
          created_at: string
          employee_id: string | null
          id: string
          is_active: boolean | null
          messages: Json
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
          messages?: Json
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
          messages?: Json
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "ai_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_employees: {
        Row: {
          avatar: string
          cost: number
          created_at: string
          id: string
          name: string
          performance_metrics: Json | null
          specialization: string | null
          status: string
          success_rate: number
          tasks_completed: number
          training_data: Json | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar?: string
          cost?: number
          created_at?: string
          id?: string
          name: string
          performance_metrics?: Json | null
          specialization?: string | null
          status?: string
          success_rate?: number
          tasks_completed?: number
          training_data?: Json | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar?: string
          cost?: number
          created_at?: string
          id?: string
          name?: string
          performance_metrics?: Json | null
          specialization?: string | null
          status?: string
          success_rate?: number
          tasks_completed?: number
          training_data?: Json | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_reskilling_resources: {
        Row: {
          cost_type: string | null
          created_at: string
          description: string | null
          id: string
          provider: string
          skill_area: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          cost_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          provider: string
          skill_area: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          cost_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          provider?: string
          skill_area?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      ai_task_assessments: {
        Row: {
          category: string
          confidence: number | null
          created_at: string
          explanation: string | null
          id: string
          occupation_code: string
          task_description: string
          updated_at: string
        }
        Insert: {
          category: string
          confidence?: number | null
          created_at?: string
          explanation?: string | null
          id?: string
          occupation_code: string
          task_description: string
          updated_at?: string
        }
        Update: {
          category?: string
          confidence?: number | null
          created_at?: string
          explanation?: string | null
          id?: string
          occupation_code?: string
          task_description?: string
          updated_at?: string
        }
        Relationships: []
      }
      alert_configurations: {
        Row: {
          alert_type: string
          created_at: string | null
          criteria: Json
          id: string
          is_active: boolean | null
          last_triggered: string | null
          name: string
          notification_settings: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          criteria: Json
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          name: string
          notification_settings: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          criteria?: Json
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          name?: string
          notification_settings?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      arbitrage_alerts: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          jurisdiction: string
          legal_interests: string[]
          opportunities: Json
          updated_at: string | null
          user_id: string | null
          user_role: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          jurisdiction: string
          legal_interests: string[]
          opportunities: Json
          updated_at?: string | null
          user_id?: string | null
          user_role: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          jurisdiction?: string
          legal_interests?: string[]
          opportunities?: Json
          updated_at?: string | null
          user_id?: string | null
          user_role?: string
        }
        Relationships: []
      }
      assessment_attempts: {
        Row: {
          completed_at: string | null
          correct_answers: number | null
          created_at: string | null
          id: string
          questions_data: Json
          score: number | null
          study_path_id: string | null
          time_taken_seconds: number | null
          total_questions: number | null
          user_answers: Json
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          questions_data: Json
          score?: number | null
          study_path_id?: string | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_answers: Json
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          questions_data?: Json
          score?: number | null
          study_path_id?: string | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_answers?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_study_path_id_fkey"
            columns: ["study_path_id"]
            isOneToOne: false
            referencedRelation: "study_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          difficulty_level: number | null
          id: string
          options: Json | null
          question_text: string
          question_type: string
          section_type: string
          study_path_id: string | null
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          difficulty_level?: number | null
          id?: string
          options?: Json | null
          question_text: string
          question_type: string
          section_type: string
          study_path_id?: string | null
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          difficulty_level?: number | null
          id?: string
          options?: Json | null
          question_text?: string
          question_type?: string
          section_type?: string
          study_path_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_study_path_id_fkey"
            columns: ["study_path_id"]
            isOneToOne: false
            referencedRelation: "study_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions_bank: {
        Row: {
          assessment_id: string | null
          correct_answer: string | null
          created_at: string | null
          difficulty: string | null
          id: string
          options: Json | null
          points: number | null
          question_text: string
          question_type: string
        }
        Insert: {
          assessment_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text: string
          question_type: string
        }
        Update: {
          assessment_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text?: string
          question_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_bank_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "mock_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          answers: Json
          assessment_id: string | null
          completed_at: string | null
          correct_answers: number | null
          created_at: string | null
          id: string
          score: number | null
          time_taken_seconds: number | null
          total_questions: number | null
          user_id: string | null
        }
        Insert: {
          answers: Json
          assessment_id?: string | null
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          score?: number | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_id?: string | null
        }
        Update: {
          answers?: Json
          assessment_id?: string | null
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          score?: number | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "mock_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_sessions: {
        Row: {
          assistant_id: string
          completed_at: string | null
          correct_answers: number | null
          created_at: string
          current_difficulty: number | null
          final_score: number | null
          id: string
          mastery_level: number | null
          questions_asked: number | null
          recommendations: Json | null
          session_data: Json | null
          session_type: string | null
          started_at: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assistant_id: string
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          current_difficulty?: number | null
          final_score?: number | null
          id?: string
          mastery_level?: number | null
          questions_asked?: number | null
          recommendations?: Json | null
          session_data?: Json | null
          session_type?: string | null
          started_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assistant_id?: string
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          current_difficulty?: number | null
          final_score?: number | null
          id?: string
          mastery_level?: number | null
          questions_asked?: number | null
          recommendations?: Json | null
          session_data?: Json | null
          session_type?: string | null
          started_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      billing_records: {
        Row: {
          amount: number
          created_at: string
          currency: string
          description: string | null
          external_id: string | null
          id: string
          metadata: Json | null
          status: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          description?: string | null
          external_id?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          external_id?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          business_name: string
          business_type: string
          categories: string[]
          created_at: string | null
          description: string | null
          employee_count: number | null
          growth_stage: string | null
          id: string
          monthly_revenue: number | null
          start_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_name: string
          business_type: string
          categories?: string[]
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          growth_stage?: string | null
          id?: string
          monthly_revenue?: number | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string
          categories?: string[]
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          growth_stage?: string | null
          id?: string
          monthly_revenue?: number | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      cache_entries: {
        Row: {
          created_at: string | null
          data: Json
          expires_at: string
          key: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          expires_at: string
          key: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          expires_at?: string
          key?: string
        }
        Relationships: []
      }
      care_profiles: {
        Row: {
          created_at: string | null
          emergency_contacts: Json | null
          id: string
          medical_conditions: string[] | null
          medications: Json | null
          preferences: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          emergency_contacts?: Json | null
          id?: string
          medical_conditions?: string[] | null
          medications?: Json | null
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          emergency_contacts?: Json | null
          id?: string
          medical_conditions?: string[] | null
          medications?: Json | null
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      caregiver_assessments: {
        Row: {
          assessment_date: string | null
          care_recipient_id: string | null
          caregiver_user_id: string | null
          created_at: string | null
          id: string
          resources_provided: string[] | null
          stress_level: number | null
          support_needs: string[] | null
        }
        Insert: {
          assessment_date?: string | null
          care_recipient_id?: string | null
          caregiver_user_id?: string | null
          created_at?: string | null
          id?: string
          resources_provided?: string[] | null
          stress_level?: number | null
          support_needs?: string[] | null
        }
        Update: {
          assessment_date?: string | null
          care_recipient_id?: string | null
          caregiver_user_id?: string | null
          created_at?: string | null
          id?: string
          resources_provided?: string[] | null
          stress_level?: number | null
          support_needs?: string[] | null
        }
        Relationships: []
      }
      cases: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          summary: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          summary?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          summary?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          issuing_organization: string
          name: string
          requirements: string | null
          skill_id: string | null
          validity_period_months: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          issuing_organization: string
          name: string
          requirements?: string | null
          skill_id?: string | null
          validity_period_months?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          issuing_organization?: string
          name?: string
          requirements?: string | null
          skill_id?: string | null
          validity_period_months?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "certifications_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          context_modules: string[] | null
          conversation_data: Json | null
          created_at: string | null
          id: string
          last_activity: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          context_modules?: string[] | null
          conversation_data?: Json | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          context_modules?: string[] | null
          conversation_data?: Json | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
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
      climate_risk_assessments: {
        Row: {
          adaptation_strategies: Json
          ai_insights: string | null
          climate_data: Json
          created_at: string | null
          id: string
          location_data: Json
          risk_analysis: Json
          status: string
          updated_at: string | null
          user_id: string
          zip_code: string
        }
        Insert: {
          adaptation_strategies?: Json
          ai_insights?: string | null
          climate_data?: Json
          created_at?: string | null
          id?: string
          location_data?: Json
          risk_analysis?: Json
          status?: string
          updated_at?: string | null
          user_id: string
          zip_code: string
        }
        Update: {
          adaptation_strategies?: Json
          ai_insights?: string | null
          climate_data?: Json
          created_at?: string | null
          id?: string
          location_data?: Json
          risk_analysis?: Json
          status?: string
          updated_at?: string | null
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      collaborative_care_plans: {
        Row: {
          ai_recommendations: Json | null
          approval_status: string | null
          approved_by: string | null
          created_at: string | null
          id: string
          professional_modifications: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_recommendations?: Json | null
          approval_status?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          professional_modifications?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_recommendations?: Json | null
          approval_status?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          professional_modifications?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collaborative_care_plans_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "professional_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborative_documents: {
        Row: {
          collaborators: string[] | null
          content: Json
          created_at: string | null
          document_type: string
          id: string
          owner_id: string | null
          permissions: Json
          status: string | null
          title: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          collaborators?: string[] | null
          content: Json
          created_at?: string | null
          document_type: string
          id?: string
          owner_id?: string | null
          permissions?: Json
          status?: string | null
          title: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          collaborators?: string[] | null
          content?: Json
          created_at?: string | null
          document_type?: string
          id?: string
          owner_id?: string | null
          permissions?: Json
          status?: string | null
          title?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collaborative_documents_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_events: {
        Row: {
          comfort_level: string | null
          created_at: string | null
          current_participants: number | null
          description: string | null
          event_datetime: string
          event_type: string
          id: string
          location_data: Json | null
          max_participants: number | null
          organizer: string | null
          title: string
        }
        Insert: {
          comfort_level?: string | null
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          event_datetime: string
          event_type: string
          id?: string
          location_data?: Json | null
          max_participants?: number | null
          organizer?: string | null
          title: string
        }
        Update: {
          comfort_level?: string | null
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          event_datetime?: string
          event_type?: string
          id?: string
          location_data?: Json | null
          max_participants?: number | null
          organizer?: string | null
          title?: string
        }
        Relationships: []
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
      connection_matches: {
        Row: {
          compatibility_score: number | null
          created_at: string | null
          id: string
          match_type: string | null
          matched_user_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          compatibility_score?: number | null
          created_at?: string | null
          id?: string
          match_type?: string | null
          matched_user_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          compatibility_score?: number | null
          created_at?: string | null
          id?: string
          match_type?: string | null
          matched_user_id?: string | null
          status?: string | null
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
      conversation_analytics: {
        Row: {
          agent_id: string | null
          created_at: string | null
          id: string
          message_count: number | null
          project_id: string | null
          response_time_avg: number | null
          satisfaction_score: number | null
          sentiment_score: number | null
          session_id: string | null
          topics: string[] | null
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          message_count?: number | null
          project_id?: string | null
          response_time_avg?: number | null
          satisfaction_score?: number | null
          sentiment_score?: number | null
          session_id?: string | null
          topics?: string[] | null
          user_id: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          message_count?: number | null
          project_id?: string | null
          response_time_avg?: number | null
          satisfaction_score?: number | null
          sentiment_score?: number | null
          session_id?: string | null
          topics?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_analytics_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_analytics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crisis_events: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          description: string
          escalation_potential: string | null
          event_type: string
          expires_at: string | null
          id: string
          keywords: string[] | null
          regions: string[]
          severity: number
          source_urls: string[] | null
          timeline_urgency: string | null
          title: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          description: string
          escalation_potential?: string | null
          event_type: string
          expires_at?: string | null
          id?: string
          keywords?: string[] | null
          regions: string[]
          severity: number
          source_urls?: string[] | null
          timeline_urgency?: string | null
          title: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          description?: string
          escalation_potential?: string | null
          event_type?: string
          expires_at?: string | null
          id?: string
          keywords?: string[] | null
          regions?: string[]
          severity?: number
          source_urls?: string[] | null
          timeline_urgency?: string | null
          title?: string
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
      detailed_user_progress: {
        Row: {
          completion_percentage: number | null
          content_id: string
          content_type: string
          created_at: string | null
          difficulty_rating: number | null
          id: string
          last_accessed: string | null
          mastery_level: number | null
          notes: string | null
          section_type: string | null
          time_spent_minutes: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completion_percentage?: number | null
          content_id: string
          content_type: string
          created_at?: string | null
          difficulty_rating?: number | null
          id?: string
          last_accessed?: string | null
          mastery_level?: number | null
          notes?: string | null
          section_type?: string | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completion_percentage?: number | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          difficulty_rating?: number | null
          id?: string
          last_accessed?: string | null
          mastery_level?: number | null
          notes?: string | null
          section_type?: string | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      diplomatic_communications: {
        Row: {
          communication_date: string
          communication_type: string
          content_summary: string
          created_at: string | null
          cultural_context: Json | null
          hidden_meanings: Json | null
          id: string
          significance_score: number | null
          source_country: string
          target_country: string | null
          tone_analysis: Json
        }
        Insert: {
          communication_date: string
          communication_type: string
          content_summary: string
          created_at?: string | null
          cultural_context?: Json | null
          hidden_meanings?: Json | null
          id?: string
          significance_score?: number | null
          source_country: string
          target_country?: string | null
          tone_analysis: Json
        }
        Update: {
          communication_date?: string
          communication_type?: string
          content_summary?: string
          created_at?: string | null
          cultural_context?: Json | null
          hidden_meanings?: Json | null
          id?: string
          significance_score?: number | null
          source_country?: string
          target_country?: string | null
          tone_analysis?: Json
        }
        Relationships: []
      }
      document_versions: {
        Row: {
          author_id: string | null
          changes_summary: string | null
          content: Json
          created_at: string | null
          document_id: string | null
          id: string
          version_number: number
        }
        Insert: {
          author_id?: string | null
          changes_summary?: string | null
          content: Json
          created_at?: string | null
          document_id?: string | null
          id?: string
          version_number: number
        }
        Update: {
          author_id?: string | null
          changes_summary?: string | null
          content?: Json
          created_at?: string | null
          document_id?: string | null
          id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "collaborative_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      economic_models: {
        Row: {
          assumptions: Json | null
          baseline_data: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          model_name: string
          model_type: string
          parameters: Json
          results: Json | null
          scenario_id: string
          uncertainty_range: Json | null
        }
        Insert: {
          assumptions?: Json | null
          baseline_data?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          model_name: string
          model_type: string
          parameters: Json
          results?: Json | null
          scenario_id: string
          uncertainty_range?: Json | null
        }
        Update: {
          assumptions?: Json | null
          baseline_data?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          model_name?: string
          model_type?: string
          parameters?: Json
          results?: Json | null
          scenario_id?: string
          uncertainty_range?: Json | null
        }
        Relationships: []
      }
      ecosystem_insights: {
        Row: {
          action_items: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          insight_data: Json
          insight_type: string
          modules_involved: string[]
          priority_level: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          action_items?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_data: Json
          insight_type: string
          modules_involved: string[]
          priority_level?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          action_items?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_data?: Json
          insight_type?: string
          modules_involved?: string[]
          priority_level?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecosystem_insights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_tasks: {
        Row: {
          completed_at: string | null
          confidence_score: number | null
          created_at: string
          employee_id: string
          id: string
          input_prompt: string
          llm_response: string | null
          metadata: Json | null
          priority: string | null
          processing_time_ms: number | null
          status: string
          task_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string
          employee_id: string
          id?: string
          input_prompt: string
          llm_response?: string | null
          metadata?: Json | null
          priority?: string | null
          processing_time_ms?: number | null
          status?: string
          task_type: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string
          employee_id?: string
          id?: string
          input_prompt?: string
          llm_response?: string | null
          metadata?: Json | null
          priority?: string | null
          processing_time_ms?: number | null
          status?: string
          task_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_tasks_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "ai_employees"
            referencedColumns: ["id"]
          },
        ]
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
      event_participants: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
        ]
      }
      family_communication_logs: {
        Row: {
          communication_type: string
          created_at: string | null
          family_id: string
          id: string
          issues_addressed: string[] | null
          outcomes: string | null
          participants: string[] | null
          quality_rating: number | null
        }
        Insert: {
          communication_type: string
          created_at?: string | null
          family_id: string
          id?: string
          issues_addressed?: string[] | null
          outcomes?: string | null
          participants?: string[] | null
          quality_rating?: number | null
        }
        Update: {
          communication_type?: string
          created_at?: string | null
          family_id?: string
          id?: string
          issues_addressed?: string[] | null
          outcomes?: string | null
          participants?: string[] | null
          quality_rating?: number | null
        }
        Relationships: []
      }
      family_sessions: {
        Row: {
          created_at: string | null
          duration: number | null
          family_members: string[] | null
          homework: string | null
          id: string
          outcomes: string | null
          primary_user_id: string | null
          professional_id: string | null
          scheduled_at: string | null
          session_type: string
        }
        Insert: {
          created_at?: string | null
          duration?: number | null
          family_members?: string[] | null
          homework?: string | null
          id?: string
          outcomes?: string | null
          primary_user_id?: string | null
          professional_id?: string | null
          scheduled_at?: string | null
          session_type: string
        }
        Update: {
          created_at?: string | null
          duration?: number | null
          family_members?: string[] | null
          homework?: string | null
          id?: string
          outcomes?: string | null
          primary_user_id?: string | null
          professional_id?: string | null
          scheduled_at?: string | null
          session_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_sessions_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professional_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_profiles: {
        Row: {
          bank_account_status: string | null
          created_at: string | null
          credit_score: number | null
          debt_amount: number | null
          financial_goals: Json | null
          id: string
          insurance_coverage: string[] | null
          monthly_expenses: number | null
          monthly_income: number | null
          savings_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bank_account_status?: string | null
          created_at?: string | null
          credit_score?: number | null
          debt_amount?: number | null
          financial_goals?: Json | null
          id?: string
          insurance_coverage?: string[] | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          savings_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bank_account_status?: string | null
          created_at?: string | null
          credit_score?: number | null
          debt_amount?: number | null
          financial_goals?: Json | null
          id?: string
          insurance_coverage?: string[] | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          savings_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back_text: string
          created_at: string | null
          difficulty: number | null
          ease_factor: number | null
          front_text: string
          id: string
          interval_days: number | null
          last_reviewed: string | null
          next_review: string | null
          review_count: number | null
          study_path_id: string | null
          user_id: string | null
        }
        Insert: {
          back_text: string
          created_at?: string | null
          difficulty?: number | null
          ease_factor?: number | null
          front_text: string
          id?: string
          interval_days?: number | null
          last_reviewed?: string | null
          next_review?: string | null
          review_count?: number | null
          study_path_id?: string | null
          user_id?: string | null
        }
        Update: {
          back_text?: string
          created_at?: string | null
          difficulty?: number | null
          ease_factor?: number | null
          front_text?: string
          id?: string
          interval_days?: number | null
          last_reviewed?: string | null
          next_review?: string | null
          review_count?: number | null
          study_path_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_study_path_id_fkey"
            columns: ["study_path_id"]
            isOneToOne: false
            referencedRelation: "study_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_assessment_questions: {
        Row: {
          assessment_id: string | null
          correct_answer: string | null
          created_at: string | null
          difficulty: string | null
          explanation: string | null
          id: string
          options: Json | null
          points: number | null
          question_text: string
          question_type: string
        }
        Insert: {
          assessment_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text: string
          question_type?: string
        }
        Update: {
          assessment_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text?: string
          question_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "mock_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      historical_patterns: {
        Row: {
          confidence_level: number | null
          created_at: string | null
          description: string
          examples: Json
          id: string
          pattern_name: string
          pattern_type: string
          predictive_power: number | null
          regions: string[]
          statistical_significance: number | null
          time_period: unknown
          updated_at: string | null
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string | null
          description: string
          examples: Json
          id?: string
          pattern_name: string
          pattern_type: string
          predictive_power?: number | null
          regions: string[]
          statistical_significance?: number | null
          time_period: unknown
          updated_at?: string | null
        }
        Update: {
          confidence_level?: number | null
          created_at?: string | null
          description?: string
          examples?: Json
          id?: string
          pattern_name?: string
          pattern_type?: string
          predictive_power?: number | null
          regions?: string[]
          statistical_significance?: number | null
          time_period?: unknown
          updated_at?: string | null
        }
        Relationships: []
      }
      integrations: {
        Row: {
          config: Json
          created_at: string
          credentials: Json | null
          id: string
          integration_type: string
          is_active: boolean | null
          last_sync: string | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          config?: Json
          created_at?: string
          credentials?: Json | null
          id?: string
          integration_type: string
          is_active?: boolean | null
          last_sync?: string | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          config?: Json
          created_at?: string
          credentials?: Json | null
          id?: string
          integration_type?: string
          is_active?: boolean | null
          last_sync?: string | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      knowledge_connections: {
        Row: {
          connection_type: string
          created_at: string | null
          id: string
          source_id: string
          source_type: string
          strength: number | null
          target_id: string
          target_type: string
          user_id: string | null
        }
        Insert: {
          connection_type: string
          created_at?: string | null
          id?: string
          source_id: string
          source_type: string
          strength?: number | null
          target_id: string
          target_type: string
          user_id?: string | null
        }
        Update: {
          connection_type?: string
          created_at?: string | null
          id?: string
          source_id?: string
          source_type?: string
          strength?: number | null
          target_id?: string
          target_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      landmark_predictions: {
        Row: {
          case_details: string
          created_at: string | null
          id: string
          justification: string
          likelihood: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          case_details: string
          created_at?: string | null
          id?: string
          justification: string
          likelihood: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          case_details?: string
          created_at?: string | null
          id?: string
          justification?: string
          likelihood?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      learning_analytics: {
        Row: {
          attempts: number | null
          concept: string
          created_at: string
          difficulty_progression: Json | null
          id: string
          last_practiced: string | null
          mastery_score: number | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number | null
          concept: string
          created_at?: string
          difficulty_progression?: Json | null
          id?: string
          last_practiced?: string | null
          mastery_score?: number | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number | null
          concept?: string
          created_at?: string
          difficulty_progression?: Json | null
          id?: string
          last_practiced?: string | null
          mastery_score?: number | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      learning_content: {
        Row: {
          content_text: string | null
          content_type: string | null
          content_url: string | null
          created_at: string | null
          id: string
          is_required: boolean | null
          learning_path_id: string
          order_index: number | null
          title: string
        }
        Insert: {
          content_text?: string | null
          content_type?: string | null
          content_url?: string | null
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          learning_path_id: string
          order_index?: number | null
          title: string
        }
        Update: {
          content_text?: string | null
          content_type?: string | null
          content_url?: string | null
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          learning_path_id?: string
          order_index?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_content_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: number | null
          estimated_duration_hours: number | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_hours?: number | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_hours?: number | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      learning_progress: {
        Row: {
          completion_percentage: number | null
          created_at: string | null
          id: string
          last_accessed: string | null
          module_id: string
          module_name: string
          performance_data: Json | null
          score: number | null
          time_spent_minutes: number | null
          user_id: string | null
        }
        Insert: {
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          module_id: string
          module_name: string
          performance_data?: Json | null
          score?: number | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Update: {
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          module_id?: string
          module_name?: string
          performance_data?: Json | null
          score?: number | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_evolution_models: {
        Row: {
          confidence_score: number
          created_at: string | null
          id: string
          legal_domain: string
          time_horizon: string
          trend_analysis: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          confidence_score: number
          created_at?: string | null
          id?: string
          legal_domain: string
          time_horizon: string
          trend_analysis: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          confidence_score?: number
          created_at?: string | null
          id?: string
          legal_domain?: string
          time_horizon?: string
          trend_analysis?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      loneliness_profiles: {
        Row: {
          availability: Json | null
          created_at: string | null
          id: string
          location_data: Json | null
          loneliness_score: number | null
          preferred_activities: string[] | null
          social_connections_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          availability?: Json | null
          created_at?: string | null
          id?: string
          location_data?: Json | null
          loneliness_score?: number | null
          preferred_activities?: string[] | null
          social_connections_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          availability?: Json | null
          created_at?: string | null
          id?: string
          location_data?: Json | null
          loneliness_score?: number | null
          preferred_activities?: string[] | null
          social_connections_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      mental_health_monitoring: {
        Row: {
          baseline_mood_score: number | null
          created_at: string | null
          current_trend: string | null
          id: string
          last_assessment_date: string | null
          total_assessments: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          baseline_mood_score?: number | null
          created_at?: string | null
          current_trend?: string | null
          id?: string
          last_assessment_date?: string | null
          total_assessments?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          baseline_mood_score?: number | null
          created_at?: string | null
          current_trend?: string | null
          id?: string
          last_assessment_date?: string | null
          total_assessments?: number | null
          updated_at?: string | null
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
          definition: string | null
          description: string | null
          examples: Json | null
          id: number
          key_principles: Json | null
          last_used: string | null
          name: string
          overall_rank: number | null
          prompt_template: string | null
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
          definition?: string | null
          description?: string | null
          examples?: Json | null
          id?: number
          key_principles?: Json | null
          last_used?: string | null
          name: string
          overall_rank?: number | null
          prompt_template?: string | null
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
          definition?: string | null
          description?: string | null
          examples?: Json | null
          id?: number
          key_principles?: Json | null
          last_used?: string | null
          name?: string
          overall_rank?: number | null
          prompt_template?: string | null
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
      messages: {
        Row: {
          agent_id: string | null
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          project_id: string | null
          role: string
        }
        Insert: {
          agent_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          role: string
        }
        Update: {
          agent_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      mind_maps: {
        Row: {
          concept_data: Json
          created_at: string | null
          id: string
          is_public: boolean | null
          title: string
          topic: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          concept_data: Json
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          title: string
          topic: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          concept_data?: Json
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          title?: string
          topic?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mock_assessments: {
        Row: {
          assessment_type: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          id: string
          question_count: number | null
          status: string | null
          time_limit: number | null
          title: string
          topic: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assessment_type?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          question_count?: number | null
          status?: string | null
          time_limit?: number | null
          title: string
          topic: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assessment_type?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          question_count?: number | null
          status?: string | null
          time_limit?: number | null
          title?: string
          topic?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      model_performance: {
        Row: {
          accuracy_metrics: Json
          backtesting_results: Json
          created_at: string | null
          id: string
          improvement_recommendations: string[] | null
          model_name: string
          model_version: string
          performance_score: number | null
          test_period: unknown
        }
        Insert: {
          accuracy_metrics: Json
          backtesting_results: Json
          created_at?: string | null
          id?: string
          improvement_recommendations?: string[] | null
          model_name: string
          model_version: string
          performance_score?: number | null
          test_period: unknown
        }
        Update: {
          accuracy_metrics?: Json
          backtesting_results?: Json
          created_at?: string | null
          id?: string
          improvement_recommendations?: string[] | null
          model_name?: string
          model_version?: string
          performance_score?: number | null
          test_period?: unknown
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
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
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
      professional_providers: {
        Row: {
          availability: Json | null
          contact_info: Json | null
          created_at: string | null
          id: string
          license_number: string | null
          provider_id: string
          specialties: string[] | null
          verified: boolean | null
        }
        Insert: {
          availability?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          provider_id: string
          specialties?: string[] | null
          verified?: boolean | null
        }
        Update: {
          availability?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          provider_id?: string
          specialties?: string[] | null
          verified?: boolean | null
        }
        Relationships: []
      }
      professional_sessions: {
        Row: {
          created_at: string | null
          follow_up_required: boolean | null
          id: string
          provider_id: string | null
          recommendations: string | null
          session_date: string
          session_notes: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          follow_up_required?: boolean | null
          id?: string
          provider_id?: string | null
          recommendations?: string | null
          session_date: string
          session_notes?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          follow_up_required?: boolean | null
          id?: string
          provider_id?: string | null
          recommendations?: string | null
          session_date?: string
          session_notes?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_sessions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "professional_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_locked_until: string | null
          api_credits: number | null
          created_at: string | null
          email: string | null
          failed_login_attempts: number | null
          full_name: string | null
          id: string
          last_login: string | null
          location: Json | null
          phone: string | null
          preferences: Json | null
          subscription_tier: string | null
          updated_at: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          account_locked_until?: string | null
          api_credits?: number | null
          created_at?: string | null
          email?: string | null
          failed_login_attempts?: number | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          location?: Json | null
          phone?: string | null
          preferences?: Json | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id: string
          user_type?: string
        }
        Update: {
          account_locked_until?: string | null
          api_credits?: number | null
          created_at?: string | null
          email?: string | null
          failed_login_attempts?: number | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          location?: Json | null
          phone?: string | null
          preferences?: Json | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      project_analytics: {
        Row: {
          active_agents: number | null
          ai_interactions: number | null
          completion_percentage: number | null
          created_at: string | null
          date: string | null
          files_uploaded: number | null
          id: string
          project_id: string | null
          time_spent_minutes: number | null
          total_messages: number | null
          user_id: string
        }
        Insert: {
          active_agents?: number | null
          ai_interactions?: number | null
          completion_percentage?: number | null
          created_at?: string | null
          date?: string | null
          files_uploaded?: number | null
          id?: string
          project_id?: string | null
          time_spent_minutes?: number | null
          total_messages?: number | null
          user_id: string
        }
        Update: {
          active_agents?: number | null
          ai_interactions?: number | null
          completion_percentage?: number | null
          created_at?: string | null
          date?: string | null
          files_uploaded?: number | null
          id?: string
          project_id?: string | null
          time_spent_minutes?: number | null
          total_messages?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_analytics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          analysis_results: Json | null
          analysis_status: string | null
          created_at: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          project_id: string | null
          storage_path: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_results?: Json | null
          analysis_status?: string | null
          created_at?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          project_id?: string | null
          storage_path: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_results?: Json | null
          analysis_status?: string | null
          created_at?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          project_id?: string | null
          storage_path?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          is_public: boolean | null
          name: string
          template_data: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          is_public?: boolean | null
          name: string
          template_data?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          is_public?: boolean | null
          name?: string
          template_data?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          files: string[] | null
          id: string
          image_url: string | null
          is_public: boolean
          name: string
          project_id: string
          prompt: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name: string
          project_id: string
          prompt?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name?: string
          project_id?: string
          prompt?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      question_responses: {
        Row: {
          ai_feedback: string | null
          correct_answer: string | null
          created_at: string
          difficulty_level: number | null
          id: string
          is_correct: boolean | null
          question_data: Json
          question_text: string
          session_id: string | null
          time_taken_seconds: number | null
          user_answer: string | null
        }
        Insert: {
          ai_feedback?: string | null
          correct_answer?: string | null
          created_at?: string
          difficulty_level?: number | null
          id?: string
          is_correct?: boolean | null
          question_data?: Json
          question_text: string
          session_id?: string | null
          time_taken_seconds?: number | null
          user_answer?: string | null
        }
        Update: {
          ai_feedback?: string | null
          correct_answer?: string | null
          created_at?: string
          difficulty_level?: number | null
          id?: string
          is_correct?: boolean | null
          question_data?: Json
          question_text?: string
          session_id?: string | null
          time_taken_seconds?: number | null
          user_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action: string
          count: number | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          user_id: string | null
          window_start: string | null
        }
        Insert: {
          action: string
          count?: number | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
          window_start?: string | null
        }
        Update: {
          action?: string
          count?: number | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
          window_start?: string | null
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
      referral_requests: {
        Row: {
          assigned_provider_id: string | null
          created_at: string | null
          current_risk_level: string | null
          follow_up_date: string | null
          id: string
          reason: string
          referral_type: string
          status: string | null
          symptoms: string[] | null
          updated_at: string | null
          urgency: string
          user_id: string | null
        }
        Insert: {
          assigned_provider_id?: string | null
          created_at?: string | null
          current_risk_level?: string | null
          follow_up_date?: string | null
          id?: string
          reason: string
          referral_type: string
          status?: string | null
          symptoms?: string[] | null
          updated_at?: string | null
          urgency: string
          user_id?: string | null
        }
        Update: {
          assigned_provider_id?: string | null
          created_at?: string | null
          current_risk_level?: string | null
          follow_up_date?: string | null
          id?: string
          reason?: string
          referral_type?: string
          status?: string | null
          symptoms?: string[] | null
          updated_at?: string | null
          urgency?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_requests_assigned_provider_id_fkey"
            columns: ["assigned_provider_id"]
            isOneToOne: false
            referencedRelation: "professional_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      renewai_ai_insights: {
        Row: {
          content: string
          created_at: string | null
          expires_at: string | null
          id: string
          insight_type: string
          metadata: Json | null
          priority: string
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_type?: string
          metadata?: Json | null
          priority?: string
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_type?: string
          metadata?: Json | null
          priority?: string
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      renewai_energy_data: {
        Row: {
          battery_level_percent: number
          consumption_kwh: number
          cost_usd: number
          created_at: string | null
          device_metadata: Json | null
          grid_export_kwh: number
          grid_import_kwh: number
          id: string
          solar_production_kwh: number
          timestamp: string | null
          user_id: string
          weather_data: Json | null
        }
        Insert: {
          battery_level_percent?: number
          consumption_kwh?: number
          cost_usd?: number
          created_at?: string | null
          device_metadata?: Json | null
          grid_export_kwh?: number
          grid_import_kwh?: number
          id?: string
          solar_production_kwh?: number
          timestamp?: string | null
          user_id: string
          weather_data?: Json | null
        }
        Update: {
          battery_level_percent?: number
          consumption_kwh?: number
          cost_usd?: number
          created_at?: string | null
          device_metadata?: Json | null
          grid_export_kwh?: number
          grid_import_kwh?: number
          id?: string
          solar_production_kwh?: number
          timestamp?: string | null
          user_id?: string
          weather_data?: Json | null
        }
        Relationships: []
      }
      renewai_notifications: {
        Row: {
          action_url: string | null
          category: string
          created_at: string | null
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          priority: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          category?: string
          created_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          priority?: string
          read_at?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          category?: string
          created_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          priority?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      risk_assessments: {
        Row: {
          confidence_interval: Json
          country_code: string | null
          created_at: string | null
          expires_at: string
          factors: Json
          id: string
          region: string
          risk_level: string
          risk_score: number
          source_data: Json | null
          trend: string | null
        }
        Insert: {
          confidence_interval: Json
          country_code?: string | null
          created_at?: string | null
          expires_at: string
          factors: Json
          id?: string
          region: string
          risk_level: string
          risk_score: number
          source_data?: Json | null
          trend?: string | null
        }
        Update: {
          confidence_interval?: Json
          country_code?: string | null
          created_at?: string | null
          expires_at?: string
          factors?: Json
          id?: string
          region?: string
          risk_level?: string
          risk_score?: number
          source_data?: Json | null
          trend?: string | null
        }
        Relationships: []
      }
      saved_conversations: {
        Row: {
          category: string | null
          conversation_type: string
          created_at: string | null
          id: string
          last_updated: string | null
          messages: Json
          title: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          conversation_type?: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          messages?: Json
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          conversation_type?: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          messages?: Json
          title?: string
          user_id?: string | null
        }
        Relationships: []
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
      scenario_simulations: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          name: string
          results: Json | null
          scenario_config: Json
          scenario_type: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          name: string
          results?: Json | null
          scenario_config: Json
          scenario_type: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          name?: string
          results?: Json | null
          scenario_config?: Json
          scenario_type?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scenario_simulations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      secure_document_shares: {
        Row: {
          created_at: string | null
          current_uses: number | null
          document_id: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          permissions: Json | null
          share_token: string
          shared_by: string
        }
        Insert: {
          created_at?: string | null
          current_uses?: number | null
          document_id: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          permissions?: Json | null
          share_token: string
          shared_by: string
        }
        Update: {
          created_at?: string | null
          current_uses?: number | null
          document_id?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          permissions?: Json | null
          share_token?: string
          shared_by?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string | null
          status: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_audit_logs: {
        Row: {
          created_at: string
          details: Json
          event_type: string
          id: string
          ip_address: string | null
          session_id: string | null
          severity: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json
          event_type: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          severity: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json
          event_type?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sentiment_data: {
        Row: {
          bot_probability: number | null
          country_code: string | null
          created_at: string | null
          demographic_breakdown: Json | null
          id: string
          influence_metrics: Json | null
          platform: string
          region: string
          sentiment_score: number
          topics: Json
          volume: number
        }
        Insert: {
          bot_probability?: number | null
          country_code?: string | null
          created_at?: string | null
          demographic_breakdown?: Json | null
          id?: string
          influence_metrics?: Json | null
          platform: string
          region: string
          sentiment_score: number
          topics?: Json
          volume?: number
        }
        Update: {
          bot_probability?: number | null
          country_code?: string | null
          created_at?: string | null
          demographic_breakdown?: Json | null
          id?: string
          influence_metrics?: Json | null
          platform?: string
          region?: string
          sentiment_score?: number
          topics?: Json
          volume?: number
        }
        Relationships: []
      }
      skill_assessment_sessions: {
        Row: {
          answers: Json | null
          assessment_id: string
          completed_at: string | null
          id: string
          score: number | null
          started_at: string | null
          status: string | null
          time_taken_minutes: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          assessment_id: string
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          time_taken_minutes?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          assessment_id?: string
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          time_taken_minutes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessment_sessions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "skill_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessments: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          passing_score: number | null
          questions: Json | null
          skill_id: string
          time_limit_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          passing_score?: number | null
          questions?: Json | null
          skill_id: string
          time_limit_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          passing_score?: number | null
          questions?: Json | null
          skill_id?: string
          time_limit_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessments_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: number | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: number | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: number | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills_profiles: {
        Row: {
          career_goals: string[] | null
          certifications: Json | null
          created_at: string | null
          current_skills: string[] | null
          desired_skills: string[] | null
          education_level: string | null
          id: string
          learning_preferences: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          career_goals?: string[] | null
          certifications?: Json | null
          created_at?: string | null
          current_skills?: string[] | null
          desired_skills?: string[] | null
          education_level?: string | null
          id?: string
          learning_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          career_goals?: string[] | null
          certifications?: Json | null
          created_at?: string | null
          current_skills?: string[] | null
          desired_skills?: string[] | null
          education_level?: string | null
          id?: string
          learning_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
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
      solutions: {
        Row: {
          created_at: string | null
          id: number
          model_id: number | null
          problem_id: number
          solution_text: string
          user_rating: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          model_id?: number | null
          problem_id: number
          solution_text: string
          user_rating?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          model_id?: number | null
          problem_id?: number
          solution_text?: string
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "solutions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solutions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solutions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      study_modules: {
        Row: {
          completion_date: string | null
          content: Json
          content_type: string
          created_at: string | null
          id: string
          is_completed: boolean | null
          module_order: number
          study_path_id: string | null
          time_spent_minutes: number | null
          title: string
        }
        Insert: {
          completion_date?: string | null
          content: Json
          content_type: string
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          module_order: number
          study_path_id?: string | null
          time_spent_minutes?: number | null
          title: string
        }
        Update: {
          completion_date?: string | null
          content?: Json
          content_type?: string
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          module_order?: number
          study_path_id?: string | null
          time_spent_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_modules_study_path_id_fkey"
            columns: ["study_path_id"]
            isOneToOne: false
            referencedRelation: "study_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      study_path_modules: {
        Row: {
          content_data: Json | null
          created_at: string | null
          description: string | null
          estimated_time_minutes: number | null
          id: string
          is_required: boolean | null
          module_order: number
          module_type: string
          prerequisites: Json | null
          study_path_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_data?: Json | null
          created_at?: string | null
          description?: string | null
          estimated_time_minutes?: number | null
          id?: string
          is_required?: boolean | null
          module_order: number
          module_type?: string
          prerequisites?: Json | null
          study_path_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_data?: Json | null
          created_at?: string | null
          description?: string | null
          estimated_time_minutes?: number | null
          id?: string
          is_required?: boolean | null
          module_order?: number
          module_type?: string
          prerequisites?: Json | null
          study_path_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_path_modules_study_path_id_fkey"
            columns: ["study_path_id"]
            isOneToOne: false
            referencedRelation: "study_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      study_paths: {
        Row: {
          completed_modules: number | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          estimated_hours: number | null
          id: string
          status: string | null
          title: string
          topic: string
          total_modules: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_modules?: number | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_hours?: number | null
          id?: string
          status?: string | null
          title: string
          topic: string
          total_modules?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_modules?: number | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_hours?: number | null
          id?: string
          status?: string | null
          title?: string
          topic?: string
          total_modules?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_paths_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      study_room_participants: {
        Row: {
          id: string
          is_active: boolean | null
          joined_at: string | null
          role: string | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          role?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          role?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_room_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "study_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_room_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      study_rooms: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_participants: number | null
          name: string
          room_code: string
          topic: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          name: string
          room_code: string
          topic: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          name?: string
          room_code?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_rooms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      study_session_participants: {
        Row: {
          contributions: Json | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          left_at: string | null
          role: string | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          contributions?: Json | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          left_at?: string | null
          role?: string | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          contributions?: Json | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          left_at?: string | null
          role?: string | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      supply_chain_profiles: {
        Row: {
          created_at: string | null
          customer_base_size: number | null
          id: string
          inventory_categories: string[] | null
          logistics_challenges: string[] | null
          storage_capacity: number | null
          supplier_relationships: Json | null
          transportation_methods: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_base_size?: number | null
          id?: string
          inventory_categories?: string[] | null
          logistics_challenges?: string[] | null
          storage_capacity?: number | null
          supplier_relationships?: Json | null
          transportation_methods?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_base_size?: number | null
          id?: string
          inventory_categories?: string[] | null
          logistics_challenges?: string[] | null
          storage_capacity?: number | null
          supplier_relationships?: Json | null
          transportation_methods?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      therapeutic_goals: {
        Row: {
          achievement_status: string | null
          created_at: string | null
          goal_description: string
          id: string
          progress_score: number | null
          target_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          achievement_status?: string | null
          created_at?: string | null
          goal_description: string
          id?: string
          progress_score?: number | null
          target_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          achievement_status?: string | null
          created_at?: string | null
          goal_description?: string
          id?: string
          progress_score?: number | null
          target_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      therapy_homework: {
        Row: {
          assignment_type: string
          completed_at: string | null
          completion_status: string | null
          created_at: string | null
          due_date: string | null
          id: string
          instructions: string
          user_id: string | null
          user_notes: string | null
        }
        Insert: {
          assignment_type: string
          completed_at?: string | null
          completion_status?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          instructions: string
          user_id?: string | null
          user_notes?: string | null
        }
        Update: {
          assignment_type?: string
          completed_at?: string | null
          completion_status?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          instructions?: string
          user_id?: string | null
          user_notes?: string | null
        }
        Relationships: []
      }
      therapy_sessions: {
        Row: {
          created_at: string | null
          duration: number | null
          ended_at: string | null
          homework_assigned: string | null
          id: string
          interventions_used: string[] | null
          notes: string | null
          outcomes: string | null
          session_type: string
          started_at: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration?: number | null
          ended_at?: string | null
          homework_assigned?: string | null
          id?: string
          interventions_used?: string[] | null
          notes?: string | null
          outcomes?: string | null
          session_type: string
          started_at?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: number | null
          ended_at?: string | null
          homework_assigned?: string | null
          id?: string
          interventions_used?: string[] | null
          notes?: string | null
          outcomes?: string | null
          session_type?: string
          started_at?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      treatment_plans: {
        Row: {
          created_at: string | null
          goals: string[]
          id: string
          interventions: string[]
          progress_metrics: Json | null
          review_date: string | null
          status: string | null
          timeline: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          goals: string[]
          id?: string
          interventions: string[]
          progress_metrics?: Json | null
          review_date?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          goals?: string[]
          id?: string
          interventions?: string[]
          progress_metrics?: Json | null
          review_date?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      unified_users: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          ecosystem_tier: string | null
          email: string
          full_name: string
          id: string
          language_preference: string | null
          location: Json
          phone: string | null
          profile_completion_score: number | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          ecosystem_tier?: string | null
          email: string
          full_name: string
          id?: string
          language_preference?: string | null
          location?: Json
          phone?: string | null
          profile_completion_score?: number | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          ecosystem_tier?: string | null
          email?: string
          full_name?: string
          id?: string
          language_preference?: string | null
          location?: Json
          phone?: string | null
          profile_completion_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_certifications: {
        Row: {
          certificate_url: string | null
          certification_id: string
          created_at: string | null
          earned_date: string
          expiry_date: string | null
          id: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          certification_id: string
          created_at?: string | null
          earned_date: string
          expiry_date?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          certification_id?: string
          created_at?: string | null
          earned_date?: string
          expiry_date?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_engagement_metrics: {
        Row: {
          action_details: Json | null
          action_type: string
          id: string
          metadata: Json | null
          page_url: string | null
          session_id: string | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string
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
      user_learning_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          learning_content_id: string | null
          learning_path_id: string
          progress_percentage: number | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          learning_content_id?: string | null
          learning_path_id: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          learning_content_id?: string | null
          learning_path_id?: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_learning_content_id_fkey"
            columns: ["learning_content_id"]
            isOneToOne: false
            referencedRelation: "learning_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_learning_progress_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notes: {
        Row: {
          content: string
          created_at: string | null
          id: string
          note_type: string | null
          related_topics: string[] | null
          study_path_id: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          note_type?: string | null
          related_topics?: string[] | null
          study_path_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          note_type?: string | null
          related_topics?: string[] | null
          study_path_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notes_study_path_id_fkey"
            columns: ["study_path_id"]
            isOneToOne: false
            referencedRelation: "study_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
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
      user_profiles: {
        Row: {
          created_at: string | null
          id: string
          notification_settings: Json | null
          organization: string | null
          preferences: Json | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          notification_settings?: Json | null
          organization?: string | null
          preferences?: Json | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_settings?: Json | null
          organization?: string | null
          preferences?: Json | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          created_at: string | null
          id: string
          last_reviewed: string | null
          mastery_level: number | null
          next_review: string | null
          review_count: number | null
          section_type: string
          study_path_id: string | null
          topic: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_reviewed?: string | null
          mastery_level?: number | null
          next_review?: string | null
          review_count?: number | null
          section_type: string
          study_path_id?: string | null
          topic: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_reviewed?: string | null
          mastery_level?: number | null
          next_review?: string | null
          review_count?: number | null
          section_type?: string
          study_path_id?: string | null
          topic?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_study_path_id_fkey"
            columns: ["study_path_id"]
            isOneToOne: false
            referencedRelation: "study_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          id: string
          notification_settings: Json | null
          preferences: Json | null
          privacy_settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_settings?: Json | null
          preferences?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_settings?: Json | null
          preferences?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          created_at: string | null
          id: string
          last_assessed_at: string | null
          proficiency_level: number | null
          skill_id: string
          updated_at: string | null
          user_id: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_assessed_at?: string | null
          proficiency_level?: number | null
          skill_id: string
          updated_at?: string | null
          user_id: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_assessed_at?: string | null
          proficiency_level?: number | null
          skill_id?: string
          updated_at?: string | null
          user_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          gemini_api_key: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          gemini_api_key?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          gemini_api_key?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      video_scripts: {
        Row: {
          created_at: string | null
          duration: number
          id: string
          is_public: boolean | null
          script_content: Json
          script_type: string
          target_audience: string | null
          title: string
          topic: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration: number
          id?: string
          is_public?: boolean | null
          script_content: Json
          script_type: string
          target_audience?: string | null
          title: string
          topic: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: number
          id?: string
          is_public?: boolean | null
          script_content?: Json
          script_type?: string
          target_audience?: string | null
          title?: string
          topic?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      voice_sessions: {
        Row: {
          agent_id: string | null
          created_at: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          project_id: string | null
          session_status: string | null
          transcription: string | null
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          project_id?: string | null
          session_status?: string | null
          transcription?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          project_id?: string | null
          session_status?: string | null
          transcription?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_sessions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_sessions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
      generate_secure_share_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
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
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      has_role: {
        Args: {
          user_uuid: string
          required_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      has_role_or_higher: {
        Args: {
          user_uuid: string
          required_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      update_project_analytics: {
        Args: { p_project_id: string; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
