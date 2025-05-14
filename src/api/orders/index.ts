import { supabase } from "@/src/lib/supabase"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"


export const useAdminOrderLIst = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}