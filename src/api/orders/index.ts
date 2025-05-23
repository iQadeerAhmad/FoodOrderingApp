import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/AuthProvider"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"


export const useAdminOrderLIst = ({ archived = false }) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']

    return useQuery({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').in('status', statuses)
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

export const useMyOrderLIst = () => {
    const { session } = useAuth();
    const id = session?.user.id;
    return useQuery({

        queryKey: ['orders', { userId: id }],
        queryFn: async () => {
            if (!id) return null;
            const { data, error } = await supabase.from('orders').select('*').eq('user_id', id)
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],

        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
            if (error) {
                throw new Error(error.message)
            }
            return data
        },

    })
}