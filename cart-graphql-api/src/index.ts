import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start server
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`
  🛒 ====================================== 🛒
  
     Cart GraphQL API Server
     CNPMM BT07 - 22110180
  
  🚀 Server đang chạy tại: ${url}
  
  📖 Truy cập Apollo Sandbox để test API:
     ${url}
  
  📋 Các chức năng:
     - Xem giỏ hàng
     - Thêm sản phẩm vào giỏ hàng
     - Sửa số lượng sản phẩm
     - Xóa sản phẩm khỏi giỏ hàng
     - Chọn sản phẩm để thanh toán
     - Thanh toán
  
  🛒 ====================================== 🛒
  `);
};

startServer().catch(console.error);

