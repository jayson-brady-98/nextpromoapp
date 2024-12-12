import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://papraoywbxpwfqefgyyi.supabase.co'
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcHJhb3l3Ynhwd2ZxZWZneXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDA3NzYsImV4cCI6MjA0ODc3Njc3Nn0.bWDJLbi7XakzXklE2L92EoVHyPvew36rqscteuEO4nY
const supabase = createClient(supabaseUrl, supabaseKey)
