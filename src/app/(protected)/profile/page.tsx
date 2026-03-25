import { verifySession } from "@/lib/dal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEmailDialog } from "@/components/auth/change-email-dialog"
import { ChangePasswordDialog } from "@/components/auth/change-password-dialog"
import { DeleteAccountDialog } from "@/components/auth/delete-account-dialog"

function getInitials(name?: string | null): string {
  if (!name) return "U"
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export default async function ProfilePage() {
  const session = await verifySession()
  const name = session.user?.name ?? ""
  const email = session.user?.email ?? ""
  const image = session.user?.image ?? ""

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h1 className="text-2xl font-semibold">
        Profile
      </h1>

      <div className="flex flex-col space-y-8">
        <Avatar className="size-32 text-xl">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Nome:</Label>
            <Input id="profile-name" value={name} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">E-mail:</Label>
            <Input id="profile-email" type="email" value={email} readOnly />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <ChangeEmailDialog />
        <ChangePasswordDialog />
        <DeleteAccountDialog />
      </div>
    </div>
  )
}
