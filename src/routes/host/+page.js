import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load = async ({ parent }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(303, "/login");
	}
};
