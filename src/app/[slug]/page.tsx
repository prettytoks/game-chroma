'use client';

import { fetchGame } from '../api';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Image } from 'antd';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const { Title, Paragraph, Text } = Typography;

interface Game {
  id: number;
  title: string;
  first_release_date: number;
  summary: string;
  rating: number;
  slug: string;
  category: number;
  storyline: string;
  cover_image_id: string;
  genres: string[];
  release_dates: number[];
  themes: string[];
  platforms: string[];
  player_perspectives: string[];
  engines: string[];
  franchises: string[];
  game_modes: string[];
  similar_games: string[];
  artworks: string[];
  companies: string[];
}

export default function Page({ params }: { params: { slug: string } }) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameData = await fetchGame(params.slug);
        setGame(gameData.video_game);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [params.slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found</p>;
  }

  return (
    <>       

      <img
        src={`https://images.igdb.com/igdb/image/upload/t_1080p_2x/${game.artworks[0]?.image_id}.jpg`}
        alt={game.title}
        style={{height: "45vh", width: '100%', objectFit: 'cover'}}
      />
                      
      <div style={{ margin: '60px 20px 30px 20px ', padding: '15px' }}>

        <Row>

          <div style={{ margin: '0px 20px 0px 0px ', padding: '0px' }}>

            <Col key={game.id} >
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover_image_id}.jpg`}
                alt={game.title}
                style={{borderRadius: '10px', margin: '25px 0px 0 0px'}}
                width={300}
              />
              </Col>

          </div>

        
          <Col key={game.id} lg={18}>

            <Title level={2} style={{margin: '20px 0 15px 0'}}>{game.title}</Title>

            <Paragraph style={{ fontSize: '16px' }}> {game.summary} </Paragraph>

            <Paragraph style={{ fontSize: '16px'}}  type="secondary">{game.release_dates[0]?.human} </Paragraph>

            <FontAwesomeIcon
              icon={faStar}
              style={{ fontSize: '20px', color: 'gold' }}
            />
                  
            <Text style={{ fontSize: '22px' }}> {game.rating}</Text>

              <Row>

                <Col key={game.id} xs={12}>

                    <div style={{ margin: '8px 0 0 0' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Category: </Text>
                      <Text style={{ fontSize: '16px' }} type="secondary"> {game.category} </Text>
                    </div>

                    <div style={{ margin: '8px 0' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Genres: </Text>
                      {game.genres?.map((genre: any, index: number) => (
                        <Text key={genre.id}  style={{ fontSize: '16px' }} type="secondary">
                          {genre.name}
                          {index !== game.genres.length - 1 && ','} {/* Add comma if not the last item */}
                        </Text>
                      ))}
                    </div>
                  
                    <div style={{ margin: '8px 0' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Engines: </Text>
                      {game.engines?.map((engine: any, index: number) => (
                        <Text key={engine.id}  style={{ fontSize: '16px' }} type="secondary">
                          {engine.name}
                          {index !== game.engines.length - 1 && ','}
                        </Text>
                      ))}
                      </div>
                      
                    <div style={{ margin: '8px 0' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Platforms: </Text>
                      {game.platforms?.map((platform: any, index: number) => (
                        <Text key={platform.id}  style={{ fontSize: '16px' }} type="secondary">
                          {platform.name}
                          {index !== game.platforms.length - 1 && ', '}
                        </Text>
                      ))}
                      </div>

                    <Text style={{ fontSize: '18px', fontWeight: '600' }}>Player Perspective: </Text>
                    <Text style={{ fontSize: '16px' }} type="secondary">
                      {game.player_perspectives[0]?.name}
                    </Text>

                  </Col>


                  <Col key={game.id} xs={12}>

                      <div style={{ margin: '8px 0' }}>
                        <Text style={{ fontSize: '18px', fontWeight: '600' }}>Franchises: </Text>
                        {game.franchises?.map((company: any, index: number) => (
                          <Text key={company.id}  style={{ fontSize: '16px' }} type="secondary">
                            {company.name}
                            {index !== game.franchises.length - 1 && ', '}
                          </Text>
                        ))}
                      </div>

                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Companies: </Text>
                      {game.companies?.map((company: any, index: number) => (
                        <Text key={company.id}  style={{ fontSize: '16px' }} type="secondary">
                          {company.name}
                          {index !== game.companies.length - 1 && ', '}
                        </Text>
                      ))}

                      <div style={{ margin: '8px 0' }}>
                        <Text style={{ fontSize: '18px', fontWeight: '600' }}>Game Mode: </Text>
                        <Text style={{ fontSize: '16px' }} type="secondary"> {game.game_modes[0]?.name} </Text>
                      </div>

                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Themes: </Text>
                      {game.themes?.map((theme: any, index: number) => (
                        <Text key={theme.id}  style={{ fontSize: '16px' }} type="secondary">
                          {theme.name}
                          {index !== game.themes.length - 1 && ', '} 
                        </Text>
                      ))}


                  </Col>

                </Row>

            </Col>
              
        </Row>

      </div>


      <div  style={{ margin: '20px 20px 80px 20px', padding: '15px' }}>
       
       <Title level={2}>Similar Games</Title>  

        <Row gutter={[16, 16]}>
          {game.similar_games.slice(0,8).map((similarGame: any) => (
            <Col key={similarGame.id} xs={24} sm={12} md={8} lg={6}>

                <Link href={`/${similarGame.slug}`}>
                  
                    <Card
                      hoverable
                      cover={
                        <img
                          src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${similarGame.cover_image_id}.jpg`}
                          alt={similarGame.title}
                        />
                      }
                    >
                      
                      <Title level={4}>{similarGame.title}</Title>
              
                      <Text style={{ fontSize: '16px'}}  type="secondary" >
                        {format(new Date(similarGame.first_release_date), 'MMMM dd, yyyy')}
                      </Text>

                      <div style={{margin: '5px 0'}}>
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ fontSize: '16px', color: 'gold' }}
                        />
                              
                        <Text style={{ fontSize: '18px' }}> {similarGame.rating}</Text>
                      </div>

                    </Card>
                
                </Link>
        
            </Col>
          ))}

        </Row>

      </div>

    </>
  );
}
