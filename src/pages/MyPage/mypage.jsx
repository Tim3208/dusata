import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dummyPosts, dummyUsers } from '@/lib/dummyData';

const MyPage = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [users, setUsers] = useState(dummyUsers);
  const currentUserId = '20201234'; // 실제로는 로그인한 사용자의 ID를 사용
  const currentUser = users.find((user) => user.id === currentUserId);

  return (
    <Tabs defaultValue="my-posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="my-posts">내 포스트잇</TabsTrigger>
        <TabsTrigger value="bookmarked">찜한 포스트잇</TabsTrigger>
      </TabsList>

      <TabsContent value="my-posts">
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={currentUser.id}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              아직 작성한 포스트잇이 없습니다
            </p>
            <Button className="mt-4">첫 포스트잇 작성하기</Button>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="bookmarked">
        {bookmarkedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={currentUser.id}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              아직 찜한 포스트잇이 없습니다
            </p>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default MyPage;
