export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agreements: {
        Row: {
          agreement_text: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          agreement_text: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          agreement_text?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_employee_tasks: {
        Row: {
          created_at: string | null
          employee_id: string
          id: string
          input_prompt: string
          llm_response: string
          task_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          employee_id: string
          id?: string
          input_prompt: string
          llm_response: string
          task_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          employee_id?: string
          id?: string
          input_prompt?: string
          llm_response?: string
          task_type?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_employees: {
        Row: {
          avatar: string
          cost: number
          created_at: string
          id: string
          name: string
          status: string
          success_rate: number
          tasks_completed: number
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar: string
          cost?: number
          created_at?: string
          id?: string
          name: string
          status?: string
          success_rate?: number
          tasks_completed?: number
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
          status?: string
          success_rate?: number
          tasks_completed?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_modules: {
        Row: {
          category: Database["public"]["Enums"]["module_category"]
          configuration_schema: Json
          created_at: string | null
          description: string
          icon_name: string
          id: string
          name: string
          price_per_use: number
          status: Database["public"]["Enums"]["module_status"]
          supported_platforms: Database["public"]["Enums"]["platform_type"][]
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["module_category"]
          configuration_schema?: Json
          created_at?: string | null
          description: string
          icon_name: string
          id?: string
          name: string
          price_per_use?: number
          status?: Database["public"]["Enums"]["module_status"]
          supported_platforms: Database["public"]["Enums"]["platform_type"][]
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["module_category"]
          configuration_schema?: Json
          created_at?: string | null
          description?: string
          icon_name?: string
          id?: string
          name?: string
          price_per_use?: number
          status?: Database["public"]["Enums"]["module_status"]
          supported_platforms?: Database["public"]["Enums"]["platform_type"][]
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_projects: {
        Row: {
          compliance_flags: string[] | null
          config: Json
          created_at: string
          domain: string
          id: string
          llm_provider: string | null
          name: string
          status: string
          subdomain: string | null
          tenant_id: string
          token_budget: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          compliance_flags?: string[] | null
          config?: Json
          created_at?: string
          domain: string
          id?: string
          llm_provider?: string | null
          name: string
          status?: string
          subdomain?: string | null
          tenant_id: string
          token_budget?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          compliance_flags?: string[] | null
          config?: Json
          created_at?: string
          domain?: string
          id?: string
          llm_provider?: string | null
          name?: string
          status?: string
          subdomain?: string | null
          tenant_id?: string
          token_budget?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_usage: {
        Row: {
          cost: number | null
          created_at: string | null
          error_message: string | null
          id: string
          input_data: Json | null
          module_id: string
          output_data: Json | null
          processing_time_ms: number | null
          status: Database["public"]["Enums"]["usage_status"]
          tokens_used: number | null
          user_id: string
          workflow_id: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json | null
          module_id: string
          output_data?: Json | null
          processing_time_ms?: number | null
          status: Database["public"]["Enums"]["usage_status"]
          tokens_used?: number | null
          user_id: string
          workflow_id?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json | null
          module_id?: string
          output_data?: Json | null
          processing_time_ms?: number | null
          status?: Database["public"]["Enums"]["usage_status"]
          tokens_used?: number | null
          user_id?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "ai_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "ai_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_workflows: {
        Row: {
          configuration: Json
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_public: boolean | null
          module_id: string
          name: string
          platform: Database["public"]["Enums"]["platform_type"]
          updated_at: string | null
          user_id: string
          webhook_url: string | null
        }
        Insert: {
          configuration?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          module_id: string
          name: string
          platform: Database["public"]["Enums"]["platform_type"]
          updated_at?: string | null
          user_id: string
          webhook_url?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          module_id?: string
          name?: string
          platform?: Database["public"]["Enums"]["platform_type"]
          updated_at?: string | null
          user_id?: string
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_workflows_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "ai_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string
          event_category: string
          event_data: Json | null
          event_name: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_category: string
          event_data?: Json | null
          event_name: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_category?: string
          event_data?: Json | null
          event_name?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      apo_analysis_cache: {
        Row: {
          analysis_data: Json
          created_at: string
          id: string
          occupation_code: string
          occupation_title: string
          updated_at: string
        }
        Insert: {
          analysis_data: Json
          created_at?: string
          id?: string
          occupation_code: string
          occupation_title: string
          updated_at?: string
        }
        Update: {
          analysis_data?: Json
          created_at?: string
          id?: string
          occupation_code?: string
          occupation_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      audio_files: {
        Row: {
          created_at: string
          description: string | null
          duration_seconds: number | null
          file_size: number
          filename: string
          id: string
          language: string | null
          location: string | null
          mime_type: string
          original_filename: string
          recording_date: string | null
          speaker_name: string | null
          storage_path: string | null
          updated_at: string
          upload_status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          file_size: number
          filename: string
          id?: string
          language?: string | null
          location?: string | null
          mime_type: string
          original_filename: string
          recording_date?: string | null
          speaker_name?: string | null
          storage_path?: string | null
          updated_at?: string
          upload_status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          file_size?: number
          filename?: string
          id?: string
          language?: string | null
          location?: string | null
          mime_type?: string
          original_filename?: string
          recording_date?: string | null
          speaker_name?: string | null
          storage_path?: string | null
          updated_at?: string
          upload_status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_alerts: {
        Row: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          audit_id: string | null
          created_at: string
          id: string
          message: string
          metadata: Json | null
          status: Database["public"]["Enums"]["alert_status"]
          title: string
          user_id: string
        }
        Insert: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          audit_id?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["alert_status"]
          title: string
          user_id: string
        }
        Update: {
          alert_type?: Database["public"]["Enums"]["alert_type"]
          audit_id?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["alert_status"]
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_alerts_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_comparisons: {
        Row: {
          baseline_audit_id: string
          comparison_audit_id: string
          comparison_data: Json | null
          created_at: string
          id: string
          issues_added: number | null
          issues_resolved: number | null
          revenue_impact_change: number | null
          score_change: number | null
          url: string
          user_id: string
        }
        Insert: {
          baseline_audit_id: string
          comparison_audit_id: string
          comparison_data?: Json | null
          created_at?: string
          id?: string
          issues_added?: number | null
          issues_resolved?: number | null
          revenue_impact_change?: number | null
          score_change?: number | null
          url: string
          user_id: string
        }
        Update: {
          baseline_audit_id?: string
          comparison_audit_id?: string
          comparison_data?: Json | null
          created_at?: string
          id?: string
          issues_added?: number | null
          issues_resolved?: number | null
          revenue_impact_change?: number | null
          score_change?: number | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_comparisons_baseline_audit_id_fkey"
            columns: ["baseline_audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_comparisons_comparison_audit_id_fkey"
            columns: ["comparison_audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_issues: {
        Row: {
          audit_id: string
          category: Database["public"]["Enums"]["issue_category"]
          created_at: string
          description: string
          fix_code: string | null
          fix_description: string | null
          id: string
          impact: Database["public"]["Enums"]["issue_impact"]
          priority_score: number | null
          revenue_potential: number | null
          title: string
        }
        Insert: {
          audit_id: string
          category: Database["public"]["Enums"]["issue_category"]
          created_at?: string
          description: string
          fix_code?: string | null
          fix_description?: string | null
          id?: string
          impact: Database["public"]["Enums"]["issue_impact"]
          priority_score?: number | null
          revenue_potential?: number | null
          title: string
        }
        Update: {
          audit_id?: string
          category?: Database["public"]["Enums"]["issue_category"]
          created_at?: string
          description?: string
          fix_code?: string | null
          fix_description?: string | null
          id?: string
          impact?: Database["public"]["Enums"]["issue_impact"]
          priority_score?: number | null
          revenue_potential?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_issues_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          category: string | null
          created_at: string | null
          event_details: Json | null
          event_type: string | null
          id: string
          ip_address: unknown | null
          session_id: string | null
          severity: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          event_details?: Json | null
          event_type?: string | null
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          event_details?: Json | null
          event_type?: string | null
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      audit_reports: {
        Row: {
          audit_id: string
          file_path: string | null
          file_size: number | null
          generated_at: string
          id: string
          is_public: boolean | null
          report_type: string | null
          share_token: string | null
          user_id: string
        }
        Insert: {
          audit_id: string
          file_path?: string | null
          file_size?: number | null
          generated_at?: string
          id?: string
          is_public?: boolean | null
          report_type?: string | null
          share_token?: string | null
          user_id: string
        }
        Update: {
          audit_id?: string
          file_path?: string | null
          file_size?: number | null
          generated_at?: string
          id?: string
          is_public?: boolean | null
          report_type?: string | null
          share_token?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_reports_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audits: {
        Row: {
          completed_at: string | null
          created_at: string
          grade: string | null
          id: string
          overall_score: number | null
          scan_metadata: Json | null
          status: Database["public"]["Enums"]["audit_status"]
          total_revenue_potential: number | null
          updated_at: string
          url: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          grade?: string | null
          id?: string
          overall_score?: number | null
          scan_metadata?: Json | null
          status?: Database["public"]["Enums"]["audit_status"]
          total_revenue_potential?: number | null
          updated_at?: string
          url: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          grade?: string | null
          id?: string
          overall_score?: number | null
          scan_metadata?: Json | null
          status?: Database["public"]["Enums"]["audit_status"]
          total_revenue_potential?: number | null
          updated_at?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      backtest_strategies: {
        Row: {
          created_at: string | null
          date_range_end: string
          date_range_start: string
          id: string
          results: Json | null
          status: string | null
          strategy_name: string
          symbols: string[]
          user_id: string | null
          wave_rules: Json
        }
        Insert: {
          created_at?: string | null
          date_range_end: string
          date_range_start: string
          id?: string
          results?: Json | null
          status?: string | null
          strategy_name: string
          symbols: string[]
          user_id?: string | null
          wave_rules: Json
        }
        Update: {
          created_at?: string | null
          date_range_end?: string
          date_range_start?: string
          id?: string
          results?: Json | null
          status?: string | null
          strategy_name?: string
          symbols?: string[]
          user_id?: string | null
          wave_rules?: Json
        }
        Relationships: []
      }
      business_photos: {
        Row: {
          alt_text: string | null
          business_id: string
          display_order: number | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_at: string
        }
        Insert: {
          alt_text?: string | null
          business_id: string
          display_order?: number | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string
        }
        Update: {
          alt_text?: string | null
          business_id?: string
          display_order?: number | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_photos_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string
          business_name: string
          business_type: string
          created_at: string
          description: string
          email: string
          id: string
          phone: string
          services: string | null
          social_media: string | null
          target_keywords: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address: string
          business_name: string
          business_type: string
          created_at?: string
          description: string
          email: string
          id?: string
          phone: string
          services?: string | null
          social_media?: string | null
          target_keywords?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string
          business_name?: string
          business_type?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          phone?: string
          services?: string | null
          social_media?: string | null
          target_keywords?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      care_profiles: {
        Row: {
          birth_date: string | null
          created_at: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string
          id: string
          medical_conditions: string[] | null
          medications: string[] | null
          preferences: Json | null
          preferred_name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name: string
          id?: string
          medical_conditions?: string[] | null
          medications?: string[] | null
          preferences?: Json | null
          preferred_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string
          id?: string
          medical_conditions?: string[] | null
          medications?: string[] | null
          preferences?: Json | null
          preferred_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      career_assessments: {
        Row: {
          assessment_data: Json | null
          assessment_type: string
          created_at: string
          current_role: string
          experience_match_score: number
          id: string
          overall_fit_score: number
          recommendations: Json | null
          skill_gaps: Json | null
          skills_match_score: number
          target_role: string
          user_id: string
        }
        Insert: {
          assessment_data?: Json | null
          assessment_type?: string
          created_at?: string
          current_role: string
          experience_match_score: number
          id?: string
          overall_fit_score: number
          recommendations?: Json | null
          skill_gaps?: Json | null
          skills_match_score: number
          target_role: string
          user_id: string
        }
        Update: {
          assessment_data?: Json | null
          assessment_type?: string
          created_at?: string
          current_role?: string
          experience_match_score?: number
          id?: string
          overall_fit_score?: number
          recommendations?: Json | null
          skill_gaps?: Json | null
          skills_match_score?: number
          target_role?: string
          user_id?: string
        }
        Relationships: []
      }
      career_learning_modules: {
        Row: {
          content_data: Json
          created_at: string
          description: string | null
          difficulty_level: number | null
          estimated_minutes: number | null
          id: string
          is_active: boolean | null
          learning_objectives: string[] | null
          module_type: string
          prerequisites: string[] | null
          target_roles: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content_data?: Json
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          estimated_minutes?: number | null
          id?: string
          is_active?: boolean | null
          learning_objectives?: string[] | null
          module_type?: string
          prerequisites?: string[] | null
          target_roles?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content_data?: Json
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          estimated_minutes?: number | null
          id?: string
          is_active?: boolean | null
          learning_objectives?: string[] | null
          module_type?: string
          prerequisites?: string[] | null
          target_roles?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      career_recommendations: {
        Row: {
          action_items: Json | null
          created_at: string
          description: string
          expires_at: string | null
          id: string
          metadata: Json | null
          priority_score: number | null
          recommendation_type: string
          status: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_items?: Json | null
          created_at?: string
          description: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          priority_score?: number | null
          recommendation_type: string
          status?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_items?: Json | null
          created_at?: string
          description?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          priority_score?: number | null
          recommendation_type?: string
          status?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      career_transitions: {
        Row: {
          confidence_score: number | null
          created_at: string
          current_industry: string | null
          current_role: string
          estimated_timeline_months: number | null
          id: string
          target_industry: string | null
          target_role: string
          transition_stage: string
          updated_at: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          current_industry?: string | null
          current_role: string
          estimated_timeline_months?: number | null
          id?: string
          target_industry?: string | null
          target_role: string
          transition_stage?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          current_industry?: string | null
          current_role?: string
          estimated_timeline_months?: number | null
          id?: string
          target_industry?: string | null
          target_role?: string
          transition_stage?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          badge_url: string | null
          certification_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          issuing_organization: string
          name: string
          requirements: Json | null
          skill_ids: string[] | null
          updated_at: string | null
          validity_period_months: number | null
        }
        Insert: {
          badge_url?: string | null
          certification_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          issuing_organization: string
          name: string
          requirements?: Json | null
          skill_ids?: string[] | null
          updated_at?: string | null
          validity_period_months?: number | null
        }
        Update: {
          badge_url?: string | null
          certification_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          issuing_organization?: string
          name?: string
          requirements?: Json | null
          skill_ids?: string[] | null
          updated_at?: string | null
          validity_period_months?: number | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      community_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          parent_id: string | null
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "community_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_wave_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_likes: {
        Row: {
          created_at: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_wave_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_wave_posts: {
        Row: {
          chart_image_url: string | null
          comments_count: number | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          likes_count: number | null
          symbol: string
          timeframe: string
          title: string
          user_id: string | null
          wave_analysis: Json
        }
        Insert: {
          chart_image_url?: string | null
          comments_count?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          symbol: string
          timeframe: string
          title: string
          user_id?: string | null
          wave_analysis: Json
        }
        Update: {
          chart_image_url?: string | null
          comments_count?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          symbol?: string
          timeframe?: string
          title?: string
          user_id?: string | null
          wave_analysis?: Json
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          contact_email: string | null
          created_at: string
          id: string
          message: string
          response: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          id?: string
          message: string
          response?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          id?: string
          message?: string
          response?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          branding_color: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          owner_id: string
          price_cents: number
          title: string
          updated_at: string
        }
        Insert: {
          branding_color?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          owner_id: string
          price_cents: number
          title: string
          updated_at?: string
        }
        Update: {
          branding_color?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          owner_id?: string
          price_cents?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      curated_contents: {
        Row: {
          content_json: Json
          curated_at: string | null
          id: string
          source: string | null
          status: string | null
          topic: string | null
          user_id: string
        }
        Insert: {
          content_json: Json
          curated_at?: string | null
          id?: string
          source?: string | null
          status?: string | null
          topic?: string | null
          user_id: string
        }
        Update: {
          content_json?: Json
          curated_at?: string | null
          id?: string
          source?: string | null
          status?: string | null
          topic?: string | null
          user_id?: string
        }
        Relationships: []
      }
      document_chunks: {
        Row: {
          chunk_index: number
          chunk_text: string
          created_at: string
          document_id: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          project_id: string
          updated_at: string
        }
        Insert: {
          chunk_index: number
          chunk_text: string
          created_at?: string
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          project_id: string
          updated_at?: string
        }
        Update: {
          chunk_index?: number
          chunk_text?: string
          created_at?: string
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_chunks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      document_collections: {
        Row: {
          created_at: string
          document_count: number | null
          id: string
          last_ingested_at: string | null
          name: string
          namespace: string
          project_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          document_count?: number | null
          id?: string
          last_ingested_at?: string | null
          name: string
          namespace: string
          project_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          document_count?: number | null
          id?: string
          last_ingested_at?: string | null
          name?: string
          namespace?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_collections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          chunk_count: number
          file_name: string
          file_size: number
          file_type: string
          id: string
          processing_status: string
          project_id: string
          storage_path: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          chunk_count?: number
          file_name: string
          file_size: number
          file_type: string
          id?: string
          processing_status?: string
          project_id: string
          storage_path: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          chunk_count?: number
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          processing_status?: string
          project_id?: string
          storage_path?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      email_notification_preferences: {
        Row: {
          created_at: string
          id: string
          receive_collaboration_emails: boolean
          receive_community_emails: boolean
          receive_marketing_emails: boolean
          receive_system_emails: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          receive_collaboration_emails?: boolean
          receive_community_emails?: boolean
          receive_marketing_emails?: boolean
          receive_system_emails?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          receive_collaboration_emails?: boolean
          receive_community_emails?: boolean
          receive_marketing_emails?: boolean
          receive_system_emails?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      emergency_contacts: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_primary: boolean | null
          name: string
          phone: string
          relationship: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          phone: string
          relationship: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          phone?: string
          relationship?: string
          user_id?: string | null
        }
        Relationships: []
      }
      family_access: {
        Row: {
          access_level: string | null
          created_at: string | null
          family_member_email: string
          id: string
          is_active: boolean | null
          senior_user_id: string | null
        }
        Insert: {
          access_level?: string | null
          created_at?: string | null
          family_member_email: string
          id?: string
          is_active?: boolean | null
          senior_user_id?: string | null
        }
        Update: {
          access_level?: string | null
          created_at?: string | null
          family_member_email?: string
          id?: string
          is_active?: boolean | null
          senior_user_id?: string | null
        }
        Relationships: []
      }
      generated_code: {
        Row: {
          code_content: string
          created_at: string
          dependencies: string[] | null
          explanation: string | null
          framework: string
          id: string
          language: string
          paper_upload_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          code_content: string
          created_at?: string
          dependencies?: string[] | null
          explanation?: string | null
          framework: string
          id?: string
          language: string
          paper_upload_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          code_content?: string
          created_at?: string
          dependencies?: string[] | null
          explanation?: string | null
          framework?: string
          id?: string
          language?: string
          paper_upload_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_code_paper_upload_id_fkey"
            columns: ["paper_upload_id"]
            isOneToOne: false
            referencedRelation: "paper_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_websites: {
        Row: {
          about_section: Json
          business_id: string
          contact_section: Json
          generated_at: string
          hero_section: Json
          id: string
          meta_description: string | null
          schema_markup: Json | null
          seo_keywords: string[] | null
          services_section: Json
          status: string | null
          title: string
        }
        Insert: {
          about_section: Json
          business_id: string
          contact_section: Json
          generated_at?: string
          hero_section: Json
          id?: string
          meta_description?: string | null
          schema_markup?: Json | null
          seo_keywords?: string[] | null
          services_section: Json
          status?: string | null
          title: string
        }
        Update: {
          about_section?: Json
          business_id?: string
          contact_section?: Json
          generated_at?: string
          hero_section?: Json
          id?: string
          meta_description?: string | null
          schema_markup?: Json | null
          seo_keywords?: string[] | null
          services_section?: Json
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_websites_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      health_checkins: {
        Row: {
          created_at: string | null
          energy_level: number | null
          id: string
          mood_rating: number | null
          notes: string | null
          sleep_quality: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          energy_level?: number | null
          id?: string
          mood_rating?: number | null
          notes?: string | null
          sleep_quality?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          energy_level?: number | null
          id?: string
          mood_rating?: number | null
          notes?: string | null
          sleep_quality?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      job_matches: {
        Row: {
          ai_reasoning: string | null
          created_at: string
          id: string
          job_opportunity_id: string
          job_seeker_id: string
          match_score: number
          match_status: string | null
          matching_skills: string[] | null
          skill_gaps: string[] | null
          updated_at: string
        }
        Insert: {
          ai_reasoning?: string | null
          created_at?: string
          id?: string
          job_opportunity_id: string
          job_seeker_id: string
          match_score: number
          match_status?: string | null
          matching_skills?: string[] | null
          skill_gaps?: string[] | null
          updated_at?: string
        }
        Update: {
          ai_reasoning?: string | null
          created_at?: string
          id?: string
          job_opportunity_id?: string
          job_seeker_id?: string
          match_score?: number
          match_status?: string | null
          matching_skills?: string[] | null
          skill_gaps?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_job_opportunity_id_fkey"
            columns: ["job_opportunity_id"]
            isOneToOne: false
            referencedRelation: "job_opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_matches_job_seeker_id_fkey"
            columns: ["job_seeker_id"]
            isOneToOne: false
            referencedRelation: "job_seekers"
            referencedColumns: ["id"]
          },
        ]
      }
      job_opportunities: {
        Row: {
          company_name: string | null
          created_at: string
          description: string
          experience_level: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          job_type: string | null
          location: string | null
          posted_at: string
          preferred_skills: string[] | null
          remote_friendly: boolean | null
          required_skills: string[] | null
          salary_range: string | null
          title: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          description: string
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_at?: string
          preferred_skills?: string[] | null
          remote_friendly?: boolean | null
          required_skills?: string[] | null
          salary_range?: string | null
          title: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          description?: string
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_at?: string
          preferred_skills?: string[] | null
          remote_friendly?: boolean | null
          required_skills?: string[] | null
          salary_range?: string | null
          title?: string
        }
        Relationships: []
      }
      job_seekers: {
        Row: {
          created_at: string
          current_job_title: string | null
          desired_roles: string[] | null
          education_level: string | null
          experience_years: number | null
          id: string
          location: string | null
          resume_text: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_job_title?: string | null
          desired_roles?: string[] | null
          education_level?: string | null
          experience_years?: number | null
          id?: string
          location?: string | null
          resume_text?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_job_title?: string | null
          desired_roles?: string[] | null
          education_level?: string | null
          experience_years?: number | null
          id?: string
          location?: string | null
          resume_text?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      learning_content: {
        Row: {
          content_data: Json | null
          content_type: string
          content_url: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: number | null
          estimated_duration_minutes: number | null
          id: string
          is_active: boolean | null
          prerequisites: string[] | null
          skill_ids: string[] | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_data?: Json | null
          content_type: string
          content_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          prerequisites?: string[] | null
          skill_ids?: string[] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_data?: Json | null
          content_type?: string
          content_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          prerequisites?: string[] | null
          skill_ids?: string[] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      learning_content_files: {
        Row: {
          content_id: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          upload_status: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          content_id?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          upload_status?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          content_id?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          upload_status?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_content_files_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "learning_content"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_path_recommendations: {
        Row: {
          expires_at: string | null
          generated_at: string | null
          id: string
          metadata: Json | null
          priority_score: number | null
          reason: string
          recommended_path_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          expires_at?: string | null
          generated_at?: string | null
          id?: string
          metadata?: Json | null
          priority_score?: number | null
          reason: string
          recommended_path_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          expires_at?: string | null
          generated_at?: string | null
          id?: string
          metadata?: Json | null
          priority_score?: number | null
          reason?: string
          recommended_path_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_recommendations_recommended_path_id_fkey"
            columns: ["recommended_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          content_sequence: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: number | null
          estimated_duration_hours: number | null
          id: string
          is_template: boolean | null
          learning_objectives: string[] | null
          name: string
          prerequisites: Json | null
          target_skill_ids: string[] | null
          updated_at: string | null
        }
        Insert: {
          content_sequence?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_hours?: number | null
          id?: string
          is_template?: boolean | null
          learning_objectives?: string[] | null
          name: string
          prerequisites?: Json | null
          target_skill_ids?: string[] | null
          updated_at?: string | null
        }
        Update: {
          content_sequence?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_hours?: number | null
          id?: string
          is_template?: boolean | null
          learning_objectives?: string[] | null
          name?: string
          prerequisites?: Json | null
          target_skill_ids?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      learning_recommendations: {
        Row: {
          generated_at: string | null
          id: string
          reason: string | null
          recommendation_json: Json
          status: string | null
          user_id: string
        }
        Insert: {
          generated_at?: string | null
          id?: string
          reason?: string | null
          recommendation_json: Json
          status?: string | null
          user_id: string
        }
        Update: {
          generated_at?: string | null
          id?: string
          reason?: string | null
          recommendation_json?: Json
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lesson_modules: {
        Row: {
          content: string | null
          course_id: string
          created_at: string
          id: string
          order_index: number
          status: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string
          id?: string
          order_index?: number
          status?: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string
          id?: string
          order_index?: number
          status?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          id: string
          is_completed: boolean
          lesson_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          id?: string
          is_completed?: boolean
          lesson_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          id?: string
          is_completed?: boolean
          lesson_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      linguistic_analyses: {
        Row: {
          analysis_results: Json
          analysis_type: string
          created_at: string
          cultural_notes: string | null
          gemini_model_used: string | null
          id: string
          insights: string | null
          patterns_identified: string[] | null
          preservation_recommendations: string | null
          processing_time_ms: number | null
          transcription_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_results: Json
          analysis_type: string
          created_at?: string
          cultural_notes?: string | null
          gemini_model_used?: string | null
          id?: string
          insights?: string | null
          patterns_identified?: string[] | null
          preservation_recommendations?: string | null
          processing_time_ms?: number | null
          transcription_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_results?: Json
          analysis_type?: string
          created_at?: string
          cultural_notes?: string | null
          gemini_model_used?: string | null
          id?: string
          insights?: string | null
          patterns_identified?: string[] | null
          preservation_recommendations?: string | null
          processing_time_ms?: number | null
          transcription_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "linguistic_analyses_transcription_id_fkey"
            columns: ["transcription_id"]
            isOneToOne: false
            referencedRelation: "transcriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      llm_providers: {
        Row: {
          config: Json | null
          cost_per_token: number | null
          created_at: string
          enabled: boolean | null
          endpoint_url: string | null
          id: string
          name: string
          provider_type: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          config?: Json | null
          cost_per_token?: number | null
          created_at?: string
          enabled?: boolean | null
          endpoint_url?: string | null
          id?: string
          name: string
          provider_type: string
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          config?: Json | null
          cost_per_token?: number | null
          created_at?: string
          enabled?: boolean | null
          endpoint_url?: string | null
          id?: string
          name?: string
          provider_type?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      medication_logs: {
        Row: {
          created_at: string
          id: string
          medication_id: string
          notes: string | null
          status: string
          taken_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          medication_id: string
          notes?: string | null
          status: string
          taken_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          medication_id?: string
          notes?: string | null
          status?: string
          taken_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_logs_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string
          dosage: string
          frequency: string
          id: string
          instructions: string | null
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dosage: string
          frequency: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dosage?: string
          frequency?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          analysis_complete: boolean
          created_at: string
          email_notifications: boolean
          id: string
          push_notifications: boolean
          share_notifications: boolean
          system_updates: boolean
          updated_at: string
          user_id: string
          weekly_summary: boolean
        }
        Insert: {
          analysis_complete?: boolean
          created_at?: string
          email_notifications?: boolean
          id?: string
          push_notifications?: boolean
          share_notifications?: boolean
          system_updates?: boolean
          updated_at?: string
          user_id: string
          weekly_summary?: boolean
        }
        Update: {
          analysis_complete?: boolean
          created_at?: string
          email_notifications?: boolean
          id?: string
          push_notifications?: boolean
          share_notifications?: boolean
          system_updates?: boolean
          updated_at?: string
          user_id?: string
          weekly_summary?: boolean
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          template_body: string
          template_subject: string
          type: string
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          template_body: string
          template_subject: string
          type: string
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          template_body?: string
          template_subject?: string
          type?: string
          variables?: Json | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number | null
          course_id: string | null
          created_at: string
          currency: string | null
          id: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_uploads: {
        Row: {
          created_at: string
          file_size: number
          file_type: string
          filename: string
          id: string
          processing_metadata: Json | null
          storage_path: string
          updated_at: string
          upload_status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          file_size: number
          file_type: string
          filename: string
          id?: string
          processing_metadata?: Json | null
          storage_path: string
          updated_at?: string
          upload_status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          file_size?: number
          file_type?: string
          filename?: string
          id?: string
          processing_metadata?: Json | null
          storage_path?: string
          updated_at?: string
          upload_status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      personal_reminders: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          reminder_days: number[] | null
          reminder_time: string
          reminder_type: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reminder_days?: number[] | null
          reminder_time: string
          reminder_type?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reminder_days?: number[] | null
          reminder_time?: string
          reminder_type?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      portfolio_wave_status: {
        Row: {
          current_wave_type: string | null
          id: string
          last_updated: string | null
          risk_level: string | null
          symbol: string
          trend_direction: string | null
          user_id: string | null
          wave_position: string | null
        }
        Insert: {
          current_wave_type?: string | null
          id?: string
          last_updated?: string | null
          risk_level?: string | null
          symbol: string
          trend_direction?: string | null
          user_id?: string | null
          wave_position?: string | null
        }
        Update: {
          current_wave_type?: string | null
          id?: string
          last_updated?: string | null
          risk_level?: string | null
          symbol?: string
          trend_direction?: string | null
          user_id?: string | null
          wave_position?: string | null
        }
        Relationships: []
      }
      prediction_shares: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          prediction_id: string
          share_token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          prediction_id: string
          share_token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          prediction_id?: string
          share_token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prediction_shares_prediction_id_fkey"
            columns: ["prediction_id"]
            isOneToOne: false
            referencedRelation: "predictions"
            referencedColumns: ["id"]
          },
        ]
      }
      predictions: {
        Row: {
          automation_date: string
          confidence: string
          created_at: string
          drivers: string[]
          id: string
          industry: string
          job_title: string
          skills: string[]
          user_id: string
        }
        Insert: {
          automation_date: string
          confidence: string
          created_at?: string
          drivers: string[]
          id?: string
          industry: string
          job_title: string
          skills: string[]
          user_id: string
        }
        Update: {
          automation_date?: string
          confidence?: string
          created_at?: string
          drivers?: string[]
          id?: string
          industry?: string
          job_title?: string
          skills?: string[]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          api_credits: number | null
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          api_credits?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          api_credits?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      progress_sessions: {
        Row: {
          completed: boolean
          created_at: string
          hints_used: number
          id: string
          problem_text: string
          subject: string
          time_spent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          hints_used?: number
          id?: string
          problem_text: string
          subject: string
          time_spent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          hints_used?: number
          id?: string
          problem_text?: string
          subject?: string
          time_spent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          project_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          project_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          project_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          course_id: string
          created_at: string
          id: string
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          quiz_id: string | null
          responses: Json | null
          score: number | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          quiz_id?: string | null
          responses?: Json | null
          score?: number | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          quiz_id?: string | null
          responses?: Json | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_modules: {
        Row: {
          ai_model: string | null
          created_at: string
          id: string
          lesson_id: string
          questions: Json | null
          status: string
        }
        Insert: {
          ai_model?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          questions?: Json | null
          status?: string
        }
        Update: {
          ai_model?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          questions?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_modules_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          id: string
          lesson_id: string | null
          questions: Json | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id?: string | null
          questions?: Json | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: string | null
          questions?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      rag_queries: {
        Row: {
          created_at: string
          id: string
          llm_provider: string | null
          project_id: string
          query_text: string
          response_text: string | null
          response_time_ms: number | null
          retrieved_chunks: Json | null
          tokens_used: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          llm_provider?: string | null
          project_id: string
          query_text: string
          response_text?: string | null
          response_time_ms?: number | null
          retrieved_chunks?: Json | null
          tokens_used?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          llm_provider?: string | null
          project_id?: string
          query_text?: string
          response_text?: string | null
          response_time_ms?: number | null
          retrieved_chunks?: Json | null
          tokens_used?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rag_queries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      renewai_ai_insights: {
        Row: {
          confidence_score: number | null
          content: string
          created_at: string | null
          id: string
          insight_type: string
          is_active: boolean | null
          metadata: Json | null
          title: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          content: string
          created_at?: string | null
          id?: string
          insight_type: string
          is_active?: boolean | null
          metadata?: Json | null
          title: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          content?: string
          created_at?: string | null
          id?: string
          insight_type?: string
          is_active?: boolean | null
          metadata?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      renewai_energy_data: {
        Row: {
          created_at: string | null
          energy_type: string
          id: string
          metadata: Json | null
          timestamp: string | null
          unit: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          energy_type: string
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          unit?: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          energy_type?: string
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          unit?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      renewai_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reskilling_paths: {
        Row: {
          completion_percentage: number | null
          created_at: string
          estimated_duration_weeks: number | null
          id: string
          job_seeker_id: string
          path_status: string | null
          recommended_courses: Json | null
          skill_gaps: Json | null
          target_job_role: string
          updated_at: string
        }
        Insert: {
          completion_percentage?: number | null
          created_at?: string
          estimated_duration_weeks?: number | null
          id?: string
          job_seeker_id: string
          path_status?: string | null
          recommended_courses?: Json | null
          skill_gaps?: Json | null
          target_job_role: string
          updated_at?: string
        }
        Update: {
          completion_percentage?: number | null
          created_at?: string
          estimated_duration_weeks?: number | null
          id?: string
          job_seeker_id?: string
          path_status?: string | null
          recommended_courses?: Json | null
          skill_gaps?: Json | null
          target_job_role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reskilling_paths_job_seeker_id_fkey"
            columns: ["job_seeker_id"]
            isOneToOne: false
            referencedRelation: "job_seekers"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_analyses: {
        Row: {
          analysis_data: Json
          created_at: string
          id: string
          notes: string | null
          occupation_code: string
          occupation_title: string
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_data: Json
          created_at?: string
          id?: string
          notes?: string | null
          occupation_code: string
          occupation_title: string
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_data?: Json
          created_at?: string
          id?: string
          notes?: string | null
          occupation_code?: string
          occupation_title?: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scheduled_audits: {
        Row: {
          created_at: string
          email_notifications: boolean | null
          frequency: Database["public"]["Enums"]["audit_frequency"]
          id: string
          is_active: boolean
          last_run_at: string | null
          next_run_at: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean | null
          frequency: Database["public"]["Enums"]["audit_frequency"]
          id?: string
          is_active?: boolean
          last_run_at?: string | null
          next_run_at: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean | null
          frequency?: Database["public"]["Enums"]["audit_frequency"]
          id?: string
          is_active?: boolean
          last_run_at?: string | null
          next_run_at?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      search_history: {
        Row: {
          id: string
          results_count: number | null
          search_term: string
          searched_at: string
          user_id: string
        }
        Insert: {
          id?: string
          results_count?: number | null
          search_term: string
          searched_at?: string
          user_id: string
        }
        Update: {
          id?: string
          results_count?: number | null
          search_term?: string
          searched_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_analyses: {
        Row: {
          analysis_id: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          max_views: number | null
          share_token: string
          share_type: string
          shared_with_email: string | null
          updated_at: string
          user_id: string
          view_count: number
        }
        Insert: {
          analysis_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_views?: number | null
          share_token?: string
          share_type?: string
          shared_with_email?: string | null
          updated_at?: string
          user_id: string
          view_count?: number
        }
        Update: {
          analysis_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_views?: number | null
          share_token?: string
          share_type?: string
          shared_with_email?: string | null
          updated_at?: string
          user_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "shared_analyses_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "saved_analyses"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_analytics: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
          skill_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
          skill_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          period_end?: string
          period_start?: string
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_analytics_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessment_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          feedback: string | null
          id: string
          responses: Json | null
          score: number | null
          started_at: string | null
          status: string | null
          template_id: string | null
          time_spent_minutes: number | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          responses?: Json | null
          score?: number | null
          started_at?: string | null
          status?: string | null
          template_id?: string | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          responses?: Json | null
          score?: number | null
          started_at?: string | null
          status?: string | null
          template_id?: string | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessment_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "skill_assessment_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessment_templates: {
        Row: {
          assessment_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: number | null
          id: string
          is_active: boolean | null
          name: string
          passing_score: number | null
          questions: Json | null
          skill_id: string | null
          time_limit_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          assessment_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          passing_score?: number | null
          questions?: Json | null
          skill_id?: string | null
          time_limit_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          assessment_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          passing_score?: number | null
          questions?: Json | null
          skill_id?: string | null
          time_limit_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessment_templates_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessments: {
        Row: {
          assessment_method: string | null
          confidence_score: number | null
          created_at: string
          id: string
          identified_skills: Json | null
          job_seeker_id: string
          skill_levels: Json | null
          updated_at: string
        }
        Insert: {
          assessment_method?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          identified_skills?: Json | null
          job_seeker_id: string
          skill_levels?: Json | null
          updated_at?: string
        }
        Update: {
          assessment_method?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          identified_skills?: Json | null
          job_seeker_id?: string
          skill_levels?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessments_job_seeker_id_fkey"
            columns: ["job_seeker_id"]
            isOneToOne: false
            referencedRelation: "job_seekers"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_gap_analyses: {
        Row: {
          analysis_type: string
          created_at: string | null
          gap_data: Json
          generated_at: string | null
          id: string
          priority_score: number | null
          recommendations: Json | null
          reviewed_at: string | null
          status: string | null
          team_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis_type: string
          created_at?: string | null
          gap_data: Json
          generated_at?: string | null
          id?: string
          priority_score?: number | null
          recommendations?: Json | null
          reviewed_at?: string | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_type?: string
          created_at?: string | null
          gap_data?: Json
          generated_at?: string | null
          id?: string
          priority_score?: number | null
          recommendations?: Json | null
          reviewed_at?: string | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_gap_analyses_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_requests: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          industry_tags: string[] | null
          skill_name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          industry_tags?: string[] | null
          skill_name: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          industry_tags?: string[] | null
          skill_name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          industry_tags: string[] | null
          level_definitions: Json | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          industry_tags?: string[] | null
          level_definitions?: Json | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          industry_tags?: string[] | null
          level_definitions?: Json | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      student_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          id: string
          is_completed: boolean
          lesson_id: string
          quiz_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          id?: string
          is_completed?: boolean
          lesson_id: string
          quiz_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          id?: string
          is_completed?: boolean
          lesson_id?: string
          quiz_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_configurations: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_health: {
        Row: {
          checked_at: string | null
          error_message: string | null
          id: string
          metadata: Json | null
          response_time_ms: number | null
          service_name: string
          status: string
        }
        Insert: {
          checked_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          response_time_ms?: number | null
          service_name: string
          status: string
        }
        Update: {
          checked_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          response_time_ms?: number | null
          service_name?: string
          status?: string
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at: string | null
          tags: Json | null
        }
        Insert: {
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at?: string | null
          tags?: Json | null
        }
        Update: {
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          recorded_at?: string | null
          tags?: Json | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          is_active: boolean | null
          joined_at: string | null
          role: string | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          role?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          role?: string | null
          team_id?: string | null
          user_id?: string | null
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
      team_skill_matrices: {
        Row: {
          created_at: string | null
          current_avg_level: number | null
          id: string
          last_updated: string | null
          priority: string | null
          required_level: number
          skill_gap_score: number | null
          skill_id: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_avg_level?: number | null
          id?: string
          last_updated?: string | null
          priority?: string | null
          required_level?: number
          skill_gap_score?: number | null
          skill_id?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_avg_level?: number | null
          id?: string
          last_updated?: string | null
          priority?: string | null
          required_level?: number
          skill_gap_score?: number | null
          skill_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_skill_matrices_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_skill_matrices_team_id_fkey"
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
          department: string | null
          description: string | null
          id: string
          manager_id: string | null
          name: string
          skill_requirements: Json | null
          team_goals: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
          skill_requirements?: Json | null
          team_goals?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          skill_requirements?: Json | null
          team_goals?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transcriptions: {
        Row: {
          audio_file_id: string
          character_count: number | null
          confidence_score: number | null
          created_at: string
          gemini_model_used: string | null
          id: string
          language: string
          metadata: Json | null
          processing_status: string | null
          processing_time_ms: number | null
          transcript_text: string
          updated_at: string
          user_id: string
          word_count: number | null
        }
        Insert: {
          audio_file_id: string
          character_count?: number | null
          confidence_score?: number | null
          created_at?: string
          gemini_model_used?: string | null
          id?: string
          language: string
          metadata?: Json | null
          processing_status?: string | null
          processing_time_ms?: number | null
          transcript_text: string
          updated_at?: string
          user_id: string
          word_count?: number | null
        }
        Update: {
          audio_file_id?: string
          character_count?: number | null
          confidence_score?: number | null
          created_at?: string
          gemini_model_used?: string | null
          id?: string
          language?: string
          metadata?: Json | null
          processing_status?: string | null
          processing_time_ms?: number | null
          transcript_text?: string
          updated_at?: string
          user_id?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transcriptions_audio_file_id_fkey"
            columns: ["audio_file_id"]
            isOneToOne: false
            referencedRelation: "audio_files"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          confidence_score: number | null
          created_at: string
          gemini_model_used: string | null
          id: string
          metadata: Json | null
          processing_time_ms: number | null
          source_language: string
          target_language: string
          transcription_id: string
          translated_text: string
          translation_quality: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          gemini_model_used?: string | null
          id?: string
          metadata?: Json | null
          processing_time_ms?: number | null
          source_language: string
          target_language: string
          transcription_id: string
          translated_text: string
          translation_quality?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          gemini_model_used?: string | null
          id?: string
          metadata?: Json | null
          processing_time_ms?: number | null
          source_language?: string
          target_language?: string
          transcription_id?: string
          translated_text?: string
          translation_quality?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "translations_transcription_id_fkey"
            columns: ["transcription_id"]
            isOneToOne: false
            referencedRelation: "transcriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      tutorial_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          is_correct: boolean | null
          step_number: number
          tutorial_type: string
          user_id: string | null
          user_labels: Json | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          step_number: number
          tutorial_type?: string
          user_id?: string | null
          user_labels?: Json | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          step_number?: number
          tutorial_type?: string
          user_id?: string | null
          user_labels?: Json | null
        }
        Relationships: []
      }
      user_career_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          module_id: string | null
          notes: string | null
          progress_percentage: number | null
          time_spent_minutes: number | null
          transition_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string | null
          notes?: string | null
          progress_percentage?: number | null
          time_spent_minutes?: number | null
          transition_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string | null
          notes?: string | null
          progress_percentage?: number | null
          time_spent_minutes?: number | null
          transition_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_career_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "career_learning_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_career_progress_transition_id_fkey"
            columns: ["transition_id"]
            isOneToOne: false
            referencedRelation: "career_transitions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_certifications: {
        Row: {
          certification_id: string | null
          created_at: string | null
          credential_id: string | null
          earned_at: string | null
          expires_at: string | null
          id: string
          status: string | null
          updated_at: string | null
          user_id: string | null
          verification_url: string | null
        }
        Insert: {
          certification_id?: string | null
          created_at?: string | null
          credential_id?: string | null
          earned_at?: string | null
          expires_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_url?: string | null
        }
        Update: {
          certification_id?: string | null
          created_at?: string | null
          credential_id?: string | null
          earned_at?: string | null
          expires_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_url?: string | null
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
      user_chart_preferences: {
        Row: {
          device_type: string | null
          id: string
          synchronized_timeframes: string[] | null
          updated_at: string | null
          user_id: string | null
          wave_overlay_style: Json | null
          zoom_sync_enabled: boolean | null
        }
        Insert: {
          device_type?: string | null
          id?: string
          synchronized_timeframes?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          wave_overlay_style?: Json | null
          zoom_sync_enabled?: boolean | null
        }
        Update: {
          device_type?: string | null
          id?: string
          synchronized_timeframes?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          wave_overlay_style?: Json | null
          zoom_sync_enabled?: boolean | null
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          available_credits: number | null
          created_at: string | null
          id: string
          last_billing_date: string | null
          subscription_tier: string | null
          total_spent: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          available_credits?: number | null
          created_at?: string | null
          id?: string
          last_billing_date?: string | null
          subscription_tier?: string | null
          total_spent?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          available_credits?: number | null
          created_at?: string | null
          id?: string
          last_billing_date?: string | null
          subscription_tier?: string | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_data_exports: {
        Row: {
          completed_at: string | null
          expires_at: string | null
          export_type: string
          file_path: string | null
          file_size: number | null
          id: string
          requested_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          expires_at?: string | null
          export_type: string
          file_path?: string | null
          file_size?: number | null
          id?: string
          requested_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          expires_at?: string | null
          export_type?: string
          file_path?: string | null
          file_size?: number | null
          id?: string
          requested_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      user_engagement_events: {
        Row: {
          event_type: string
          id: string
          metadata: Json | null
          occurred_at: string | null
          user_id: string
        }
        Insert: {
          event_type: string
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          user_id: string
        }
        Update: {
          event_type?: string
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_engagement_metrics: {
        Row: {
          analyses_performed: number | null
          created_at: string
          date: string
          exports_performed: number | null
          features_used: string[] | null
          id: string
          pages_visited: number | null
          searches_conducted: number | null
          shares_created: number | null
          time_spent_minutes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analyses_performed?: number | null
          created_at?: string
          date?: string
          exports_performed?: number | null
          features_used?: string[] | null
          id?: string
          pages_visited?: number | null
          searches_conducted?: number | null
          shares_created?: number | null
          time_spent_minutes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analyses_performed?: number | null
          created_at?: string
          date?: string
          exports_performed?: number | null
          features_used?: string[] | null
          id?: string
          pages_visited?: number | null
          searches_conducted?: number | null
          shares_created?: number | null
          time_spent_minutes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          admin_response: string | null
          admin_user_id: string | null
          attachments: string[] | null
          browser_info: Json | null
          category: string | null
          created_at: string
          description: string
          feedback_type: string
          id: string
          priority: string
          resolved_at: string | null
          status: string
          title: string
          updated_at: string
          url_context: string | null
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          admin_user_id?: string | null
          attachments?: string[] | null
          browser_info?: Json | null
          category?: string | null
          created_at?: string
          description: string
          feedback_type: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          title: string
          updated_at?: string
          url_context?: string | null
          user_id: string
        }
        Update: {
          admin_response?: string | null
          admin_user_id?: string | null
          attachments?: string[] | null
          browser_info?: Json | null
          category?: string | null
          created_at?: string
          description?: string
          feedback_type?: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          url_context?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_learning_paths: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          learning_path_id: string | null
          progress_percentage: number | null
          started_at: string | null
          status: string | null
          target_completion_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          learning_path_id?: string | null
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          target_completion_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          learning_path_id?: string | null
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          target_completion_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_paths_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_learning_progress: {
        Row: {
          completed_at: string | null
          completion_score: number | null
          content_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          notes: string | null
          progress_percentage: number | null
          started_at: string | null
          status: string | null
          time_spent_minutes: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          completion_score?: number | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          notes?: string | null
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          completion_score?: number | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          notes?: string | null
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "learning_content"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notification_settings: {
        Row: {
          created_at: string | null
          email_enabled: boolean | null
          frequency: string | null
          id: string
          in_app_enabled: boolean | null
          notification_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_enabled?: boolean | null
          frequency?: string | null
          id?: string
          in_app_enabled?: boolean | null
          notification_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_enabled?: boolean | null
          frequency?: string | null
          id?: string
          in_app_enabled?: boolean | null
          notification_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_platform_credentials: {
        Row: {
          created_at: string | null
          encrypted_credentials: Json
          id: string
          platform: Database["public"]["Enums"]["platform_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          encrypted_credentials: Json
          id?: string
          platform: Database["public"]["Enums"]["platform_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          encrypted_credentials?: Json
          id?: string
          platform?: Database["public"]["Enums"]["platform_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_selections: {
        Row: {
          created_at: string
          id: string
          name: string
          selections: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          selections?: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          selections?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          id: string
          settings: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_skill_assessments: {
        Row: {
          assessment_data: Json | null
          assessment_type: string
          created_at: string
          id: string
          level_achieved: number
          notes: string | null
          score: number
          skill_id: string
          user_id: string
        }
        Insert: {
          assessment_data?: Json | null
          assessment_type?: string
          created_at?: string
          id?: string
          level_achieved: number
          notes?: string | null
          score: number
          skill_id: string
          user_id: string
        }
        Update: {
          assessment_data?: Json | null
          assessment_type?: string
          created_at?: string
          id?: string
          level_achieved?: number
          notes?: string | null
          score?: number
          skill_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          created_at: string | null
          current_level: number | null
          id: string
          last_assessed_at: string | null
          proficiency_score: number | null
          skill_id: string | null
          target_level: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_level?: number | null
          id?: string
          last_assessed_at?: string | null
          proficiency_score?: number | null
          skill_id?: string | null
          target_level?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_level?: number | null
          id?: string
          last_assessed_at?: string | null
          proficiency_score?: number | null
          skill_id?: string | null
          target_level?: number | null
          updated_at?: string | null
          user_id?: string | null
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
      user_subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          features_enabled: string[] | null
          id: string
          tier: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          features_enabled?: string[] | null
          id?: string
          tier?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          features_enabled?: string[] | null
          id?: string
          tier?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_watchlist: {
        Row: {
          alert_enabled: boolean | null
          created_at: string | null
          id: string
          is_favorite: boolean | null
          symbol: string
          user_id: string | null
        }
        Insert: {
          alert_enabled?: boolean | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          symbol: string
          user_id?: string | null
        }
        Update: {
          alert_enabled?: boolean | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          symbol?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_wave_settings: {
        Row: {
          degree_preference: string | null
          fibonacci_ratios: Json | null
          id: string
          symbol: string
          updated_at: string | null
          user_id: string | null
          wave_sensitivity: string | null
        }
        Insert: {
          degree_preference?: string | null
          fibonacci_ratios?: Json | null
          id?: string
          symbol: string
          updated_at?: string | null
          user_id?: string | null
          wave_sensitivity?: string | null
        }
        Update: {
          degree_preference?: string | null
          fibonacci_ratios?: Json | null
          id?: string
          symbol?: string
          updated_at?: string | null
          user_id?: string | null
          wave_sensitivity?: string | null
        }
        Relationships: []
      }
      vertical_bot_conversations: {
        Row: {
          bot_id: string
          escalation_details: string | null
          id: string
          is_escalated: boolean | null
          last_message_at: string | null
          resolved: boolean | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          bot_id: string
          escalation_details?: string | null
          id?: string
          is_escalated?: boolean | null
          last_message_at?: string | null
          resolved?: boolean | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          bot_id?: string
          escalation_details?: string | null
          id?: string
          is_escalated?: boolean | null
          last_message_at?: string | null
          resolved?: boolean | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vertical_bot_conversations_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "vertical_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      vertical_bot_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_important: boolean | null
          sender: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_important?: boolean | null
          sender: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_important?: boolean | null
          sender?: string
        }
        Relationships: [
          {
            foreignKeyName: "vertical_bot_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "vertical_bot_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      vertical_bot_training_data: {
        Row: {
          bot_id: string
          data: Json
          id: string
          uploaded_at: string | null
          uploaded_by: string
        }
        Insert: {
          bot_id: string
          data: Json
          id?: string
          uploaded_at?: string | null
          uploaded_by: string
        }
        Update: {
          bot_id?: string
          data?: Json
          id?: string
          uploaded_at?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "vertical_bot_training_data_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "vertical_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      vertical_bots: {
        Row: {
          compliance_flags: Json | null
          created_at: string | null
          description: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_vertical"]
          is_active: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          compliance_flags?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_vertical"]
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          compliance_flags?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_vertical"]
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wave_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          id: string
          is_active: boolean | null
          last_triggered: string | null
          notification_methods: string[] | null
          symbol: string
          trigger_conditions: Json
          user_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          notification_methods?: string[] | null
          symbol: string
          trigger_conditions: Json
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          notification_methods?: string[] | null
          symbol?: string
          trigger_conditions?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      wave_detections: {
        Row: {
          confidence_score: number | null
          detected_at: string | null
          fibonacci_levels: Json | null
          id: string
          last_price: number | null
          status: string | null
          symbol: string
          timeframe: string
          wave_degrees: Json | null
          wave_structure: Json
        }
        Insert: {
          confidence_score?: number | null
          detected_at?: string | null
          fibonacci_levels?: Json | null
          id?: string
          last_price?: number | null
          status?: string | null
          symbol: string
          timeframe: string
          wave_degrees?: Json | null
          wave_structure: Json
        }
        Update: {
          confidence_score?: number | null
          detected_at?: string | null
          fibonacci_levels?: Json | null
          id?: string
          last_price?: number | null
          status?: string | null
          symbol?: string
          timeframe?: string
          wave_degrees?: Json | null
          wave_structure?: Json
        }
        Relationships: []
      }
      wave_explanations: {
        Row: {
          confidence_level: number | null
          created_at: string | null
          explanation_text: string
          explanation_type: string
          id: string
          symbol: string
          timeframe: string
          wave_segment: Json
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string | null
          explanation_text: string
          explanation_type: string
          id?: string
          symbol: string
          timeframe: string
          wave_segment: Json
        }
        Update: {
          confidence_level?: number | null
          created_at?: string | null
          explanation_text?: string
          explanation_type?: string
          id?: string
          symbol?: string
          timeframe?: string
          wave_segment?: Json
        }
        Relationships: []
      }
      workflow_templates: {
        Row: {
          created_at: string
          description: string | null
          domain: string
          id: string
          n8n_workflow: Json
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          domain: string
          id?: string
          n8n_workflow: Json
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          domain?: string
          id?: string
          n8n_workflow?: Json
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      calculate_next_run: {
        Args: {
          frequency: Database["public"]["Enums"]["audit_frequency"]
          from_time?: string
        }
        Returns: string
      }
      cleanup_old_cache_entries: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_title: string
          p_message: string
          p_type?: string
          p_metadata?: Json
        }
        Returns: string
      }
      deduct_api_credits: {
        Args: { p_user_id: string; p_credits_to_deduct?: number }
        Returns: boolean
      }
      generate_share_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_analytics: {
        Args: { p_user_id: string }
        Returns: Json
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      health_check: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      increment_share_view: {
        Args: { share_token_param: string }
        Returns: Json
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      record_metric: {
        Args: {
          p_metric_name: string
          p_metric_value: number
          p_metric_type?: string
          p_tags?: Json
        }
        Returns: string
      }
      renewai_mark_notification_read: {
        Args: { notification_id: string }
        Returns: undefined
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      track_user_engagement: {
        Args: { p_user_id: string; p_event_type: string; p_value?: number }
        Returns: undefined
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      alert_status: "unread" | "read" | "dismissed"
      alert_type:
        | "score_change"
        | "new_issue"
        | "resolved_issue"
        | "scheduled_audit"
      app_role: "admin" | "moderator" | "user"
      audit_frequency: "daily" | "weekly" | "monthly"
      audit_status: "pending" | "scanning" | "completed" | "failed"
      industry_vertical: "legal" | "healthcare" | "saas" | "other"
      issue_category:
        | "performance"
        | "seo"
        | "accessibility"
        | "security"
        | "mobile"
        | "ux"
      issue_impact: "low" | "medium" | "high" | "critical"
      module_category:
        | "communication"
        | "document_processing"
        | "ecommerce"
        | "analytics"
        | "security"
        | "data_processing"
      module_status: "active" | "deprecated" | "beta"
      platform_type:
        | "bubble"
        | "webflow"
        | "zapier"
        | "airtable"
        | "shopify"
        | "stripe"
      usage_status: "success" | "error" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_status: ["unread", "read", "dismissed"],
      alert_type: [
        "score_change",
        "new_issue",
        "resolved_issue",
        "scheduled_audit",
      ],
      app_role: ["admin", "moderator", "user"],
      audit_frequency: ["daily", "weekly", "monthly"],
      audit_status: ["pending", "scanning", "completed", "failed"],
      industry_vertical: ["legal", "healthcare", "saas", "other"],
      issue_category: [
        "performance",
        "seo",
        "accessibility",
        "security",
        "mobile",
        "ux",
      ],
      issue_impact: ["low", "medium", "high", "critical"],
      module_category: [
        "communication",
        "document_processing",
        "ecommerce",
        "analytics",
        "security",
        "data_processing",
      ],
      module_status: ["active", "deprecated", "beta"],
      platform_type: [
        "bubble",
        "webflow",
        "zapier",
        "airtable",
        "shopify",
        "stripe",
      ],
      usage_status: ["success", "error", "pending"],
    },
  },
} as const
