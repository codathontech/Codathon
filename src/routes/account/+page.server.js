import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, "/login");
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", session.user.id)
		.single();

	return { session, profile };
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();

		const username = formData.get("username");
		const firstName = formData.get("firstName");
		const lastName = formData.get("lastName");
		const website = formData.get("website");
		const avatarUrl = formData.get("avatarUrl");

		if (!username) {
			return fail(400, {
				error: "Please enter a username!"
			});
		}

		const session = await getSession();

		const { error } = await supabase
			.from("profiles")
			.update({
				username,
				first_name: firstName,
				last_name: lastName,
				website,
				avatar_url: avatarUrl,
				updated_at: new Date()
			})
			.eq("id", session?.user.id)
			.select();

		if (error) {
			return fail(500, {
				error: error.message
			});
		}

		return { success: true };
	},

	logout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, "/");
		}
	}
};
