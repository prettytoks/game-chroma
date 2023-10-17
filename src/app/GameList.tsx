'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Pagination, Input, Typography, Image } from 'antd';
import { API_URL } from './api';
import Link from 'next/link'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
//import Image from 'next/image';

const { Title, Text } = Typography;


interface VideoGame {
    id: number;
    title: string;
    first_release_date: number;
    summary: string;
    rating: number;
    slug: string;
    category: number;
    storyline: string;
    cover_image_id: string;
  }
  
export default function GameList() {
  const [videoGames, setVideoGames] = useState<VideoGame[]>([]); 
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState<VideoGame[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 12 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setVideoGames(response.data.video_games);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video games:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = videoGames.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
    setPagination(prevPagination => ({ ...prevPagination, current: 1 }));
  }, [videoGames, searchQuery]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prevPagination => ({ ...prevPagination, current: page }));
  };

  if (loading) {
    return <p>Loading Games...</p>;
  }

  const { current, pageSize } = pagination;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedGames = filteredGames.slice(startIndex, endIndex);

  return (
    <>
      
      <div style={{ margin: '60px 30px 0 30px', padding: '15px' }}>

          <Title level={1}>Popular Video Games</Title>

          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ margin: '15px 0 0 0', padding: '10px', width: '300px' }}
            
          />

      </div>

      <div style={{ margin: '20px 30px', padding: '15px' }}>

        <Row gutter={[16, 16]}>
          {paginatedGames.map(game => (
            <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
              <Link href={`/${game.slug}`}>
                <Card
                  hoverable
                  cover={<Image src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover_image_id}.jpg`} alt={game.title}/>}
                >
         
                    <Title level={4}>{game.title}</Title>
                      
                    <Text style={{ fontSize: '16px'}} type="secondary">
                    {format(new Date(game.first_release_date), 'MMMM dd, yyyy')}
                    </Text>
                    
                    <div style={{margin: '5px 0'}}>
                      
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ fontSize: '16px', color: 'gold' }}
                    />
                          
                    <Text style={{ fontSize: '18px' }}> {game.rating}</Text>
                    </div>

                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <Pagination
          current={current}
          pageSize={pageSize}
          total={filteredGames.length}
          onChange={handlePageChange}
          style={{ margin: '60px', textAlign: 'center' }}
        />

      </div>
    
    </>
  );
}

