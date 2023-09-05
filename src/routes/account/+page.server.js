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

		if (!username || !firstName || !lastName) {
			return fail(500, {
				username,
				firstName,
				lastName,
				website,
				avatarUrl
			});
		}

		const session = await getSession();

		const { data, error } = await supabase
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
				username,
				firstName,
				lastName,
				website,
				avatarUrl
			});
		}

		return {
			username,
			firstName,
			lastName,
			website,
			avatarUrl
		};
	},

	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, "/");
		}
	}
};
