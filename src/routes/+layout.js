import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";

export const load = async ({ fetch, data, depends }) => {
	depends("supabase:auth");

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session) {
		const { data } = await supabase.from("profiles").select("avatar_url").eq("id", session.user.id);
		const avatar = data[0].avatar_url;

		if (avatar) {
			const { data: storageData } = await supabase.storage.from("avatars").download(avatar);
			const avatarUrl = URL.createObjectURL(storageData);

			return {
				supabase,
				session,
				avatarUrl
			};
		}
	}

	return { supabase, session };
};
